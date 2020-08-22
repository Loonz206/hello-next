/* eslint-disable react/prop-types */
import React from "react";

const Header = ({ nav }) => {
  const navRender = nav.map((navItem) => {
    return (
      <li key={navItem.title}>
        <a href={navItem.path}>{navItem.title}</a>
      </li>
    );
  });
  return (
    <header>
      <nav>
        <ul>{navRender}</ul>
      </nav>
    </header>
  );
};

export default Header;
