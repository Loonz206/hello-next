import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const Header = (props) => {
  const { links, handleClick, active } = props;

  const renderLinks = links.map(({ path, name, id }) => (
    <li key={id}>
      <Link href={path} passHref>
        <a className="nav-link" activeclassname="active" href="replace">
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
        className={active === false ? "menu-link" : "menu-link active"}
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
  handleClick: PropTypes.func,
  active: PropTypes.bool,
};
