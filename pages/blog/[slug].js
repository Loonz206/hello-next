import React from "react";
import PropTypes from "prop-types";
import Layout from "../../src/components/Layout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { getAllPosts, getPostBySlug } from "../../src/utils/contentfulPosts";

const Post = ({ post }) => {
  const { title, content, date } = post.fields;
  console.log("content", content);
  const newDate = new Date(date).toUTCString();
  const dateString = newDate.split(" ").slice(0, 4).join(" ");
  return (
    <Layout>
      <h3>{title}</h3>
      <small>{dateString} | Lenny Peters</small>
      {documentToReactComponents(content)}
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
  post: PropTypes.arrayOf(),
};
