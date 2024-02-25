import { NextPage } from "next";
import Head from "next/head";
import Layout from "../src/components/Layout/Layout";
import PostList from "../src/components/PostList/PostList";
import { links } from "../src/utils/links";
import { getAllPosts } from "../src/utils/contentfulPosts";

interface Posts {
  date: string;
  title: string;
  slug: string;
  imageCover: string;
  content: string;
  author: string;
  authorImage: string;
  authorBio: string;
  authorTwitter: string;
  authorInstagram: string;
  authorGitHub: string;
  authorLinkedIn: string;
  authorWebsite: string;
  authorLocation: string;
  authorEmail: string;
  authorPhone: string;
  authorBioImage: string;
  authorBioVideo: string;
  authorBioVideoThumbnail: string;
  authorBioVideoThumbnailAlt: string;
  authorBioVideoThumbnailTitle: string;
  authorBioVideoThumbnailDescription: string;
  authorBioVideoThumbnailCaption: string;
  authorBioVideoThumbnailCredit: string;
  authorBioVideoThumbnailCreditLink: string;
  authorBioVideoThumbnailCreditLinkText: string;
  authorBioVideoThumbnailCreditLinkTitle: string;
  authorBioVideoThumbnailCreditLinkDescription: string;
}

interface Props {
  posts: Posts[];
}

const HomePage: NextPage<Props> = ({ posts }) => {
  const renderPosts = posts.map(({ date, title, slug, imageCover }, index) => (
    <PostList
      key={index}
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
    return {
      notFound: true,
    };
  }
}
