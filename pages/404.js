import React from "react";
import Head from "next/head";
import Layout from "../src/components/Layout";

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>404 Error | Lenny Peters</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="404 Error | Lenny Peters" />
      </Head>
      <Layout>
        <h1>404 Error</h1>
        <p>Page not found.</p>
      </Layout>
    </>
  );
};

export default Custom404;

// export async function getStaticProps() {}
