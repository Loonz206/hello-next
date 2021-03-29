import React, { useEffect } from "react";
import PropTypes from "prop-types";
// Some global styles but then afterward css module pattern instead
import "../src/styles/globals.scss";

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    const body = document.querySelector("body");
    if (body && !body.classList.contains("js")) {
      body.classList.add("js");
    }
  }, []);
  return <Component {...pageProps} />;
};

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.shape(),
};
