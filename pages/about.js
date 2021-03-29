import React from "react";
import Head from "next/head";
import Layout from "../src/components/Layout";

const About = () => {
  return (
    <>
      <Head>
        <title>About | Lenny Peters</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="About Page || Hello-Next || Github Project"
        />
      </Head>
      <Layout>
        <h1>About</h1>
        <hr />
        <p>
          A software engineer with solid experiences in creating attractive,
          user-driven, responsive websites and applications. My adaptive
          personality makes it fun for me to jump into various types of teams
          and support the build from writing code to designing layouts and other
          graphical elements.
        </p>
      </Layout>
    </>
  );
};

export default About;
