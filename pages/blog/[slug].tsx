import React from "react";
import Head from "next/head";
import Image from "next/image";
import { GetStaticPropsResult, GetStaticPathsResult } from "next";
import Layout from "../../src/components/Layout/Layout";
import { IMAGE_PLACEHOLDERS, IMAGE_ALT_TEXT } from "../../src/constants/images";
import { getAllPosts, getPostBySlug } from "../../src/utils/contentfulPosts";
import { links } from "../../src/utils/links";

type PostProps = {
  post: {
    fields: {
      title: string;
      date: string;
      imageCover: string;
      metaContent: {
        fields: {
          title: string;
          metaDescription: string;
        };
      };
    };
  };
};

const Post = ({ post }: PostProps) => {
  // Type guard: ensure required fields exist
  const title = post?.fields?.title;
  const date = post?.fields?.date;
  const imageCover = post?.fields?.imageCover;
  const metaTitle = post?.fields?.metaContent?.fields?.title;
  const metaDescription = post?.fields?.metaContent?.fields?.metaDescription;

  // Validate required data
  if (!title || !date || !metaTitle || !metaDescription) {
    return (
      <Layout links={links}>
        <h1>Post Not Found</h1>
        <p>Unable to load the requested post. Please check the URL.</p>
      </Layout>
    );
  }

  const newDate = new Date(date).toUTCString();
  const dateString = newDate.split(" ").slice(0, 4).join(" ");

  return (
    <>
      <Head>
        <title>{`${metaTitle} | Lenny Peters`}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={metaDescription} />
      </Head>
      <Layout links={links}>
        <h1>{title}</h1>
        <small>{dateString} | Lenny Peters</small>
        <Image
          src={imageCover ?? IMAGE_PLACEHOLDERS.BLOG_COVER}
          width={720}
          height={405}
          alt={IMAGE_ALT_TEXT.BLOG_COVER}
        />
      </Layout>
    </>
  );
};

export default Post;

export async function getStaticProps(context: {
  params: { slug: string };
}): Promise<GetStaticPropsResult<PostProps>> {
  try {
    const { slug } = context.params;
    const post = await getPostBySlug(slug);

    if (!post) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        post: {
          fields: post.fields as PostProps["post"]["fields"],
        },
      },
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  try {
    const posts = await getAllPosts();

    return {
      paths: posts.map((post) => {
        return {
          params: {
            slug: post.fields.slug as string,
          },
        };
      }),
      fallback: false,
    };
  } catch (error) {
    console.error("Error generating static paths:", error);
    return {
      paths: [],
      fallback: false,
    };
  }
}
