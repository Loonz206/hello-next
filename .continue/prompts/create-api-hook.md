---
name: Create API Hook
description: Generate a React Query hook for API data fetching
---

# Create API Hook

Generate a React Query hook for fetching or mutating data from the API.

Requirements:

- Use React Query v5 (@tanstack/react-query)
- Hook should be in `src/hooks/useXxx.ts` directory
- File name follows pattern: useGetXxx.ts, useCreateXxx.ts, useUpdateXxx.ts, useDeleteXxx.ts
- Include TypeScript types for all parameters and return values
- Document hook with JSDoc comments
- Include error handling

For Query Hooks (fetching data):

- Create queryKey based on parameters
- Set appropriate staleTime and gcTime
- Use `enabled` for conditional queries
- Return { data, isLoading, error, isError }
- Handle dependent queries correctly

For Mutation Hooks (modifying data):

- Use `useQueryClient()` for cache invalidation
- Implement `onSuccess` for cache updates
- Implement `onError` for error handling
- Return { mutate, isPending, error }

Pattern to follow:

```typescript
export function useXxx(param: string, options = {}) {
  return useQuery({
    queryKey: ["key", param],
    queryFn: () => fetchXxx(param),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
}
```

Reference: `.continue/rules/05-api-patterns.md`
