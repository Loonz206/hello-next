import Head from "next/head";
import Image from "next/image";
import Layout from "../../src/components/Layout/Layout";
import { getAllPosts, getPostBySlug } from "../../src/utils/contentfulPosts";
import { links } from "../../src/utils/links";

const Post = (post: {
  fields: {
    metaContent?: {
      fields: {
        title: string;
        metaDescription: string;
      };
    };
    imageCover?: string;
    title?: string;
    date?: string;
  };
}) => {
  const { title, date } = post.fields;
  const metaTitle = post?.fields?.metaContent?.fields.title;
  const metaDescription = post?.fields?.metaContent?.fields.metaDescription;
  const newDate = new Date(date!).toUTCString();
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
          priority={true}
          src={post.fields.imageCover || "https://place-hold.it/720x405"}
          width={720}
          height={405}
          alt="a grey frame"
        />
      </Layout>
    </>
  );
};

export default Post;

interface ContextProps {
  params: {
    slug: string;
  };
}

export async function getStaticProps(context: ContextProps) {
  const { slug } = context.params;
  try {
    const post = await getPostBySlug(slug);
    return {
      props: { post },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  try {
    const res = await getAllPosts("posts");
    const posts = res?.map((p) => {
      return p.fields;
    });

    return {
      paths: posts?.map(({ slug }) => {
        return {
          params: {
            slug,
          },
        };
      }),
      fallback: false,
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}
