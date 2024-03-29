import { createClient } from "contentful";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export async function getAllPosts(name: string) {
  const contentType = {
    name,
  };
  try {
    const entries = await client.getEntries({
      // get data if the contentType matches post
      content_type: "post",

      // order results
      order: ["-fields.date"],
    });
    if (entries.items) {
      return entries.items;
    }
  } catch (error) {
    // eslint-disable-next-line no-undef
    console.log(`Error getting Entries for ${contentType.name}.`, error);
  }
}

export async function getAllCards(name) {
  const contentType = {
    name,
  };
  try {
    const entries = await client.getEntries({
      content_type: "card",
    });
    if (entries.items) {
      return entries.items;
    }
  } catch (error) {
    // eslint-disable-next-line no-undef
    console.log(`Error getting Entries for ${contentType.name}.`, error);
  }
}

// get a post by slug
export async function getPostBySlug(slug) {
  try {
    const entries = await client.getEntries({
      content_type: "post",

      // number of getting data
      limit: 1,

      // filtering getting post by slug
      "fields.slug[in]": slug,
    });
    if (entries.items) {
      return entries.items[0];
    }
  } catch (error) {
    // eslint-disable-next-line no-undef
    console.log(`Error getting Entries for posts ${slug}.`, error);
  }
}

// get 3 latest posts
export async function getMorePosts(slug) {
  try {
    const entries = await client.getEntries({
      content_type: "post",
      limit: 3,
      order: ["-fields.date"],

      // filtering getting post by slug
      "fields.slug[nin]": slug,
    });

    if (entries.items) {
      return entries.items;
    }
  } catch (error) {
    // eslint-disable-next-line no-undef
    console.log(`Error getting Entries for posts ${slug}.`, error);
  }
}

function parsePostSlug({ fields }) {
  return {
    slug: fields.slug,
  };
}

function parsePostSlugEntries(entries, cb = parsePostSlug) {
  return entries?.items?.map(cb);
}

// get all existing URL
export async function getAllPostsWithSlug(name: string) {
  const contentType = {
    name,
  };
  try {
    const entries = await client.getEntries({
      content_type: "post",

      // getting value of slug
      select: ["fields.slug"],
    });
    return parsePostSlugEntries(entries, (post) => post.fields);
  } catch (error) {
    // eslint-disable-next-line no-undef
    console.log(`Error getting Entries for ${contentType.name}.`, error);
  }
}
