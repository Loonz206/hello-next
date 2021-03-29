import "@babel/polyfill";
import { createClient } from "contentful";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export async function getAllPosts() {
  const entries = await client.getEntries({
    // get data if the contentType matches post
    content_type: "post",

    // order results
    order: "-fields.date",
  });
  if (entries.items) {
    return entries.items;
  }
  // eslint-disable-next-line no-undef
  console.log(`Error getting Entries for ${contentType.name}.`);
}

// get a post by slug
export async function getPostBySlug(slug) {
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
  // eslint-disable-next-line no-undef
  console.log(`Error getting Entries for ${contentType.name}.`);
}

// get 3 latest posts
export async function getMorePosts(slug) {
  const entries = await client.getEntries({
    content_type: "post",
    limit: 3,
    order: "-fields.date",

    // filtering getting post by slug
    "fields.slug[nin]": slug,
  });

  if (entries.items) {
    return entries.items;
  }
  // eslint-disable-next-line no-undef
  console.log(`Error getting Entries for ${contentType.name}.`);
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
export async function getAllPostsWithSlug() {
  const entries = await client.getEntries({
    content_type: "post",

    // getting value of slug
    select: "fields.slug",
  });
  return parsePostSlugEntries(entries, (post) => post.fields);
}
