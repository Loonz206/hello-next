import React from "react";

// eslint-disable-next-line react/prop-types
const Post = ({ date, title, description }) => {
  const newDate = new Date(date).toUTCString();
  const dateString = newDate.split(" ").slice(0, 4).join(" ");

  return (
    <div className="container">
      <div className="text">
        <h2>{title}</h2>
        <h4>{dateString}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Post;
