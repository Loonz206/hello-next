import React from "react";
import Head from "next/head";
import Image from "next/image";
import Layout from "../src/components/Layout/Layout";
import { links } from "../src/utils/links";

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>404 Error | Lenny Peters</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="404 Error | Lenny Peters" />
      </Head>
      <Layout links={links}>
        <h1>404 Error</h1>
        <p>Page not found.</p>
        <Image
          priority={true}
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
