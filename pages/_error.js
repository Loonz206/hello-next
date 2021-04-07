import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import Layout from "../src/components/Layout";

const Error = ({ statusCode }) => {
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
      <Layout>
        <p>
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : "An error occurred on client"}
        </p>
      </Layout>
    </>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

Error.propTypes = {
  statusCode: PropTypes.string,
};
