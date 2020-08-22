/* eslint-disable react/prop-types */
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  const nav = [
    {
      title: "Home",
      path: "/home",
    },
    {
      title: "About",
      path: "/about",
    },
    {
      title: "Contact",
      path: "/contact",
    },
  ];
  return (
    <div className="container">
      <Header nav={nav} />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
