import React from "react";
import Head from "next/head";
import Image from "next/image";
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
        <Image
          width={720}
          height={405}
          src="https://media.giphy.com/media/13d2jHlSlxklVe/giphy.gif"
          alt="Nothing to see here | 404 Page"
        />
      </Layout>
    </>
  );
};

export default Custom404;
