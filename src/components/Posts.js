import React from "react";
import PropTypes from "prop-types";

const Post = ({ date, title, description }) => {
  return (
    <div className="post">
      <div className="text">
        <h2>{title}</h2>
        <h3>{date.substring(0, 10)}</h3>
        <div className="description">{description}</div>
      </div>
    </div>
  );
};

Post.propTypes = {
  date: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Post;
