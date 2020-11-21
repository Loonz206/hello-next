import React, { useState, useEffect } from "react";
import { links } from "../utils/links";
import PropTypes from "prop-types";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = (props) => {
  const [state, setState] = useState("hello");
  const handleClick = () => {
    return state === "hello" ? setState("boob") : setState("hello");
  };
  const { children } = props;
  // TODO: Move these links to be dynamic instead and fed into LKP

  useEffect(() => {
    const body = document.querySelector("body");
    if (body && !body.classList.contains("js")) {
      body.classList.add("js");
    }
  }, []);
  return (
    <div className={state === "hello" ? "wrap" : "wrap active"} id="wrap">
      <Header handleClick={handleClick} state={state} links={links} />
      <main id="content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

Layout.defaultProps = {
  children: [],
};

Layout.propTypes = {
  children: PropTypes.node,
};
