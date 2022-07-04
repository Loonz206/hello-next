import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import Layout from "../src/components/Layout";
import { getAllCards } from "../src/utils/contentfulPosts";

const About = ({ cards }) => {
  const { headline } = cards[0].fields;
  const { detail } = cards[0].fields;
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
        <h1>{headline}</h1>
        <p>{detail}</p>
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

export async function getStaticProps() {
  const res = await getAllCards();
  const cards = await res;

  if (!cards) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      cards,
    },
  };
}

About.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape),
};

export default About;
