import React from "react";
import Head from "next/head";
import Layout from "../src/components/Layout";

const Custom500 = () => {
  return (
    <>
      <Head>
        <title>500 Error | Lenny Peters</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="500 Error | Lenny Peters" />
      </Head>
      <Layout>
        <h1>500 Error</h1>
        <p>Server Error.</p>
      </Layout>
    </>
  );
};

export default Custom500;
