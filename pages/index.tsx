import React from "react";
import Head from "next/head";
import Layout from "../src/components/Layout/Layout";
import PostList from "../src/components/PostList/PostList";
import { links } from "../src/utils/links";
import { getAllPosts } from "../src/utils/contentfulPosts";

type HomePageProps = {
  posts: {
    date: string;
    title: string;
    slug: string;
    imageCover: string;
  }[];
};

const HomePage = ({ posts }: HomePageProps) => {
  const renderPosts = posts.map(({ date, title, slug, imageCover }) => (
    <PostList
      key={title + date}
      date={date}
      title={title}
      slug={slug}
      imageCover={imageCover}
    />
  ));

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
        {posts.length > 0 ? renderPosts : null}
      </Layout>
    </>
  );
};

export default HomePage;

export async function getStaticProps() {
  try {
    const res = await getAllPosts("posts");
    const posts = res?.map((p) => {
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
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
