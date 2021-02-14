import "@babel/polyfill";

const client = require("contentful").createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export async function fetchEntries() {
  const entries = await client.getEntries();
  if (entries.items) return entries.items;
  // eslint-disable-next-line no-undef
  console.log(`Error getting Entries for ${contentType.name}.`);
}

export default { fetchEntries };
