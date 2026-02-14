---
name: API Agent
globs:
  [
    "**/api/**/*.ts",
    "**/hooks/**/*.ts",
    "**/queries/**/*.ts",
    "**/mutations/**/*.ts",
  ]
alwaysApply: false
description: Implement React Query patterns - Server state management and data fetching
---

# 🌐 API Agent Instructions

**Agent Responsibility**: Implement API integration patterns using React Query
with best practices for data fetching, caching, and state management.

**Activation Triggers**: New API integration needed; triggered when building data-fetching features
**Execution Model**: Parallel (optional; runs alongside React Agent and Lint Agent)

---

## Overview

The API Agent handles:

- **React Query Integration**: Server state management with caching, synchronization, and background refetching
- **API Fetching Patterns**: Best practices for client-side and server-side data fetching in Next.js
- **Error Handling**: Robust error management with user feedback
- **Performance Optimization**: Query deduplication, cache invalidation, pagination, infinite queries
- **Functional Programming**: Pure functions, composability, and immutability in data fetching

**Primary Tool**: [@tanstack/react-query](https://tanstack.com/query/latest) (React Query v5)

---

## 1. React Query Setup & Configuration

### Installation

```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
```

### Provider Setup

Wrap your application with `QueryClientProvider`:

**pages/\_app.tsx**:

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create a client for the whole app
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10,   // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true
    },
    mutations: {
      retry: 1
    }
  }
});

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
```

---

## 2. Query Hooks (Data Fetching)

### Basic Query Hook

Fetch data with caching and automatic refetching:

```typescript
// hooks/useGetPosts.ts
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/api/posts";

/**
 * Fetch all blog posts with React Query caching
 *
 * @param options - Optional React Query options
 * @returns Query result with data, isLoading, error, etc.
 */
export function useGetPosts(options = {}) {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetchPosts();
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
}
```

**Usage in Component**:

```typescript
import { useGetPosts } from '@/hooks/useGetPosts';

export function PostList() {
  const { data, isLoading, error } = useGetPosts();

  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data?.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

### Query with Parameters

```typescript
// hooks/useGetPost.ts
import { useQuery } from "@tanstack/react-query";
import { fetchPost } from "@/api/posts";

export function useGetPost(slug: string, options = {}) {
  return useQuery({
    queryKey: ["post", slug], // Include parameter in queryKey
    queryFn: () => fetchPost(slug),
    enabled: !!slug, // Only run if slug exists
    staleTime: 1000 * 60 * 10,
    ...options,
  });
}
```

### Dependent Queries

Chain queries where one depends on another:

```typescript
export function useGetUserPosts(userId: string, options = {}) {
  // First query: Get user
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId,
  });

  // Second query: Get user's posts (depends on user data)
  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ["user", userId, "posts"],
    queryFn: () => fetchUserPosts(userId),
    enabled: !!user, // Only run after user is loaded
    ...options,
  });

  return {
    user,
    posts,
    isLoading: userLoading || postsLoading,
  };
}
```

### Parallel Queries

Fetch multiple independent queries:

```typescript
export function useGetPostsWithAuthors() {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const authorsQuery = useQuery({
    queryKey: ["authors"],
    queryFn: fetchAuthors,
  });

  return {
    posts: postsQuery.data,
    authors: authorsQuery.data,
    isLoading: postsQuery.isLoading || authorsQuery.isLoading,
  };
}
```

---

## 3. Pagination & Infinite Queries

### Offset-Based Pagination

```typescript
export function useGetPostsPaginated(pageSize = 10) {
  const [page, setPage] = useState(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => fetchPosts({ skip: page * pageSize, limit: pageSize }),
    staleTime: 1000 * 60 * 5,
  });

  return {
    data,
    isLoading,
    error,
    page,
    setPage,
    hasMore: (data?.length ?? 0) === pageSize,
  };
}
```

### Infinite Queries (Infinite Scroll)

```typescript
export function useGetPostsInfinite() {
  return useInfiniteQuery({
    queryKey: ["posts", "infinite"],
    queryFn: ({ pageParam = 0 }) => fetchPosts({ skip: pageParam, limit: 10 }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 10 ? allPages.length * 10 : undefined,
    staleTime: 1000 * 60 * 5,
  });
}
```

---

## 4. Mutation Hooks (Create/Update/Delete)

### Basic Mutation

```typescript
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
```

### Optimistic Updates

```typescript
export function useUpdatePostOptimistic(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates) => updatePost(postId, updates),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["post", postId] });
      const previousPost = queryClient.getQueryData(["post", postId]);
      queryClient.setQueryData(["post", postId], (old) => ({
        ...old,
        ...newData,
      }));
      return { previousPost };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(["post", postId], context.previousPost);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
  });
}
```

---

## 5. API Client Factory

### Centralized Configuration

```typescript
// api/client.ts
import axios from "axios";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default client;
```

### API Endpoints

```typescript
// api/posts.ts
import client from "./client";

export const fetchPosts = (): Promise<Post[]> => client.get("/posts");
export const fetchPost = (slug: string): Promise<Post> =>
  client.get(`/posts/${slug}`);
export const createPost = (data: Partial<Post>): Promise<Post> =>
  client.post("/posts", data);
export const updatePost = (id: string, data: Partial<Post>): Promise<Post> =>
  client.patch(`/posts/${id}`, data);
export const deletePost = (id: string): Promise<void> =>
  client.delete(`/posts/${id}`);
```

---

## 6. Server-Side Data Fetching in Next.js

### getServerSideProps with Hydration

```typescript
// pages/blog/[slug].tsx
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchPost } from "@/api/posts";

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["post", context.params?.slug],
    queryFn: () => fetchPost(context.params?.slug),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
```

---

## 7. Error Handling & Retries

### Error Handling

```typescript
export function PostList() {
  const { data, error, isError } = useGetPosts();

  if (isError) {
    return (
      <div className="error">
        <p>Failed to load posts</p>
        {error instanceof Error && <p>{error.message}</p>}
      </div>
    );
  }

  return <ul>{data?.map(post => <li key={post.id}>{post.title}</li>)}</ul>;
}
```

### Retry Configuration

```typescript
export function useGetPostsWithRetry() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
```

---

## 8. Query Key Factory (Best Practice)

```typescript
// hooks/queryKeys.ts
export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (filters) => [...postKeys.lists(), { filters }] as const,
  details: () => [...postKeys.all, "detail"] as const,
  detail: (id) => [...postKeys.details(), id] as const,
};

// Usage
export function useGetPosts(filters) {
  return useQuery({
    queryKey: postKeys.list(filters),
    queryFn: () => fetchPosts(filters),
  });
}

export function useGetPost(id) {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => fetchPost(id),
  });
}
```

---

## 9. Testing API Hooks

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useGetPosts', () => {
  it('fetches and returns posts', async () => {
    const { result } = renderHook(() => useGetPosts(), {
      wrapper: createWrapper()
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBeDefined();
  });
});
```

---

## 10. Best Practices

✅ **DO**:

- Use React Query for server state
- Organize query keys in a factory
- Implement error boundaries
- Use optimistic updates
- Test hooks with proper setup
- Configure retry strategies
- Use appropriate staleTime values

❌ **DON'T**:

- Store server state in useState
- Duplicate API calls
- Forget cache invalidation
- Ignore loading/error states
- Create query keys as strings
- Neglect retry configuration

---

**Last Updated**: January 30, 2026
**Status**: ✅ React Query best practices enforced
