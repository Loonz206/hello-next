import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import Layout from "../src/components/Layout";
import PostList from "../src/components/PostList";
import { links } from "../src/utils/links";
import { getAllPosts } from "../src/utils/contentfulPosts";

const HomePage = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Next Blog | Lenny Peters</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Hello-Next || Github Project" />
      </Head>
      <Layout links={links}>
        <h1>
          {posts.length > 1 ? `${posts.length} Posts` : `${posts.length} Post`}
        </h1>
        <hr />
        {posts.length > 0
          ? posts.map(
              (
                { date, title, description, author, slug, imageCover },
                index
              ) => (
                <PostList
                  key={index}
                  date={date}
                  title={title}
                  description={description}
                  author={author}
                  slug={slug}
                  imageCover={imageCover}
                />
              )
            )
          : null}
      </Layout>
    </>
  );
};

export default HomePage;

export async function getStaticProps() {
  const res = await getAllPosts();
  const posts = await res.map((p) => {
    return p.fields;
  });

  if (!posts) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts,
    },
  };
}

HomePage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape),
};
