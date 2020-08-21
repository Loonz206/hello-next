import React from "react";
import Head from "next/head";
import Layout from "../components/Layout";

const Home = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1>Hello World</h1>
      </Layout>
    </>
  );
};

export default Home;
