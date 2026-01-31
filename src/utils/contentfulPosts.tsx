import {
  createClient,
  EntryCollection,
  EntrySkeletonType,
  Entry,
} from "contentful";

// Check for required environment variables
if (
  !process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ||
  !process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
) {
  throw new Error("Contentful environment variables are not set.");
}

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

// Helper to fetch entries
async function fetchEntries<T>(
  query: Record<string, unknown>,
): Promise<T[] | undefined> {
  try {
    const entries = await client.getEntries(query);
    if (entries.items) {
      return entries.items as T[];
    }
  } catch (error) {
    console.error("Error fetching entries:", error);
    throw error;
  }
}

export async function getAllPosts(): Promise<
  Entry<EntrySkeletonType, undefined, string>[] | undefined
> {
  return fetchEntries<Entry<EntrySkeletonType, undefined, string>>({
    content_type: "post",
    order: ["-fields.date"],
  });
}

export async function getAllCards(): Promise<
  Entry<EntrySkeletonType, undefined, string>[] | undefined
> {
  return fetchEntries<Entry<EntrySkeletonType, undefined, string>>({
    content_type: "card",
  });
}

export async function getPostBySlug(
  slug: string,
): Promise<Entry<EntrySkeletonType, undefined, string> | undefined> {
  const items = await fetchEntries<Entry<EntrySkeletonType, undefined, string>>(
    {
      content_type: "post",
      limit: 1,
      "fields.slug[in]": slug,
    },
  );
  return items ? items[0] : undefined;
}

export async function getMorePosts(
  slug: string,
): Promise<Entry<EntrySkeletonType, undefined, string>[] | undefined> {
  return fetchEntries<Entry<EntrySkeletonType, undefined, string>>({
    content_type: "post",
    limit: 3,
    order: ["-fields.date"],
    "fields.slug[nin]": slug,
  });
}

type ParsePostSlugProps = Entry<EntrySkeletonType, undefined, string>;

function parsePostSlug({ fields }: ParsePostSlugProps) {
  return {
    slug: fields.slug as string,
  };
}

function parsePostSlugEntries(
  entries: EntryCollection<EntrySkeletonType, undefined, string>,
  cb = parsePostSlug,
) {
  return entries?.items?.map(cb);
}

export async function getAllPostsWithSlug(): Promise<
  { slug: string }[] | undefined
> {
  try {
    const entries = await client.getEntries({
      content_type: "post",
      select: ["fields.slug"],
    });
    return parsePostSlugEntries(entries, (post) => ({
      slug: post.fields.slug as string,
    }));
  } catch (error) {
    console.error("Error getting Entries for posts.", error);
    throw error;
  }
}
