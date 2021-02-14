import React, { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "../src/components/Layout";
import Post from "../src/components/Post";
import { links } from "../src/utils/links";
import { fetchEntries } from "../src/utils/contentfulPosts";

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const allPosts = await fetchEntries();
      setPosts([...allPosts]);
    }
    getPosts();
  }, []);

  return (
    <>
      <Head>
        <title>Next Blog | Lenny Peters</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Hello-Next || Github Project" />
      </Head>
      <Layout links={links}>
        {posts.length > 0
          ? posts.map((p, index) => (
              <Post
                key={index}
                date={p.fields.date}
                title={p.fields.title}
                description={p.fields.description}
              />
            ))
          : null}
      </Layout>
    </>
  );
}

export default HomePage;
