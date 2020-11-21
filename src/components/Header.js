import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const Header = (props) => {
  // eslint-disable-next-line react/prop-types
  const { links, handleClick, state } = props;

  const renderLinks = links.map(({ path, name, id }) => (
    <li key={id}>
      <Link href={path}>
        <a className="nav-link" activeclassname="active">
          {name}
        </a>
      </Link>
    </li>
  ));

  return (
    <header>
      <a href="#content" className="sr-only">
        Skip to Content
      </a>
      <a
        href="#menu"
        className={state === "hello" ? "menu-link" : "menu-link active"}
        onClick={() => handleClick()}
      >
        Menu &#x2630;
      </a>
      <nav id="menu" role="navigation">
        <ul>{renderLinks}</ul>
      </nav>
    </header>
  );
};

export default Header;

Header.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
