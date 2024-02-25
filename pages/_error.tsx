import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Layout from "../src/components/Layout/Layout";
import { links } from "../src/utils/links";

interface Props {
  statusCode?: number;
}

const Error: NextPage<Props> = ({ statusCode }) => {
  return (
    <>
      <Head>
        <title>
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : "An error occurred on client"}
          | Lenny Peters
        </title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="500 Error | Lenny Peters" />
      </Head>
      <Layout links={links}>
        <p>
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : "An error occurred on client"}
        </p>
      </Layout>
    </>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
