import React from "react";

// eslint-disable-next-line react/prop-types
const Post = ({ date, title, description }) => {
  return (
    <div className="container">
      <div className="text">
        <h2>{title}</h2>
        <h4>{date}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Post;
