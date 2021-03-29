import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Layout from "../../src/components/Layout";

import {
  getPostBySlug,
  getMorePosts,
  getAllPostsWithSlug,
} from "../../src/utils/contentfulPosts";

const Post = ({ post }) => {
  const router = useRouter();
  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />;
  }

  return <Layout>{post?.fields.title}</Layout>;
};

export default Post;

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();
  return {
    paths: allPosts?.map(({ slug }) => `/blog/${slug}`) ?? [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);
  const morePosts = await getMorePosts(params.slug);
  return {
    props: {
      post: post || null,
      morePosts: morePosts || null,
    },
    revalidate: 1,
  };
}

// export async function getStaticPaths() {
//   // Return a list of possible value for id
// }

// export async function getStaticProps({ params }) {
//   // Fetch necessary data for the blog post using params.id
// }

Post.propTypes = {
  post: PropTypes.shape(),
};
