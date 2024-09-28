import Head from "next/head";
import Image from "next/image";
import Layout from "../../src/components/Layout/Layout";
import { getAllPosts, getPostBySlug } from "../../src/utils/contentfulPosts";
import { links } from "../../src/utils/links";

const Post = ({ post }) => {
  const { title, date } = post.fields || {};
  const metaTitle = post.fields.metaContent.fields.title;
  const metaDescription = post.fields.metaContent.fields.metaDescription;
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
          priority={true}
          src={post.fields.imageCover ?? "https://place-hold.it/720x405"}
          width={720}
          height={405}
          alt="a grey frame"
        />
      </Layout>
    </>
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
  const res = await getAllPosts("posts");
  const posts = res.map((p) => {
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
