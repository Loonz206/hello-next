import React from "react";
import PropTypes from "prop-types";

const Main = ({ children }) => {
  return (
    <main className="main" id="content">
      {children}
    </main>
  );
};

Main.defaultProps = {
  children: [],
};

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
