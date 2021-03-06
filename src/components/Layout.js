import React, { useState, useEffect } from "react";
import { links } from "../utils/links";
import PropTypes from "prop-types";
import Header from "../components/Header";
import PageProfileCard from "../components/PageProfileCard";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    return active === false ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    let mounted = true;
    const body = document.querySelector("body");
    if (mounted) {
      if (body && !body.classList.contains("js")) {
        body.classList.add("js");
      }
    }
    return () => (mounted = false);
  }, []);
  return (
    <div className={active === false ? "wrap" : "wrap active"} id="wrap">
      <Header handleClick={handleClick} active={active} links={links} />
      <PageProfileCard
        jobRole="Software Engineer & Internet Lover"
        twitterHandle="@loonz206"
      />
      <main id="content">{children}</main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  children: [],
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
