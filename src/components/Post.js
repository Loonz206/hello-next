import React from "react";
import Link from "next/link";

// eslint-disable-next-line react/prop-types
const Post = ({ date, title, description, urlName }) => {
  const newDate = new Date(date).toUTCString();
  const dateString = newDate.split(" ").slice(0, 4).join(" ");
  return (
    <article className="container">
      <Link href={urlName} passHref>
        <a className="nav-link" activeclassname="active" href="replace">
          <h3>{title}</h3>
          <small>{dateString}</small>
          <p>{description}</p>
        </a>
      </Link>
    </article>
  );
};

export default Post;
