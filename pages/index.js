import React from "react";
import Head from "next/head";
import Layout from "../src/components/Layout";
import { fetchEntries } from "../src/utils/contentfulPosts";
// import Post from "../src/components/Posts";

const Home = () => {
  const links = [
    {
      id: 0,
      name: "home",
      path: "/",
    },
    {
      id: 1,
      name: "about",
      path: "/about",
    },
  ];
  return (
    <>
      <Head>
        <title>Next Blog | Lenny Peters</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout links={links}>
        <h1>Hello World</h1>
      </Layout>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const res = await fetchEntries();
  const posts = await res.map((p) => {
    return p.fields;
  });

  return {
    props: {
      posts,
    },
  };
}
