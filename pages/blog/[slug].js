import React from "react";
import PropTypes from "prop-types";
import Layout from "../../src/components/Layout";
import { getAllPosts, getPostBySlug } from "../../src/utils/contentfulPosts";

const Post = ({ post }) => {
  const newDate = new Date(post.fields.date).toUTCString();
  const dateString = newDate.split(" ").slice(0, 4).join(" ");
  return (
    <Layout>
      <h3>{post.fields.title}</h3>
      <small>{dateString} | Lenny Peters</small>
      <p>{post.fields.description}</p>
    </Layout>
  );
};

export default Post;

export async function getStaticProps(context) {
  const { slug } = context.params;
  const post = await getPostBySlug(slug);

  return {
    props: { post },
  };
}

export async function getStaticPaths() {
  const res = await getAllPosts();
  const posts = await res.map((p) => {
    return p.fields;
  });

  return {
    paths: posts.map(({ slug }) => {
      return {
        params: {
          slug,
        },
      };
    }),
    fallback: false,
  };
}

Post.propTypes = {
  post: PropTypes.shape(),
};
