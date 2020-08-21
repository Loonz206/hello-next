import React from "react";

const Footer = () => {
  const date = new Date().getFullYear();
  const copyright = `Built with Next JS | Copyright 2020-${date}`;
  return (
    <footer>
      <p>{copyright}</p>
    </footer>
  );
};

export default Footer;
