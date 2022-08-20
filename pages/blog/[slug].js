import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Layout from "../../src/components/Layout";
import { getAllPosts, getPostBySlug } from "../../src/utils/contentfulPosts";

const Post = ({ post }) => {
  console.log("post", post);
  const { title, date } = post.fields;
  const newDate = new Date(date).toUTCString();
  const dateString = newDate.split(" ").slice(0, 4).join(" ");
  return (
    <Layout>
      <h1>{title}</h1>
      <small>{dateString} | Lenny Peters</small>
      <Image
        layout="intrinsic"
        src={post.fields.imageCover || "https://place-hold.it/720x405"}
        width={720}
        height={405}
        alt="a grey frame"
      />
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
