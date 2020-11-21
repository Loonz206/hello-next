/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
// Some global styles but then afterward css module pattern instead
import "../src/styles/globals.scss";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const body = document.querySelector("body");
    if (body && !body.classList.contains("js")) {
      body.classList.add("js");
    }
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
