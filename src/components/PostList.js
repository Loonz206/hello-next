import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const PostList = ({ date, title, description, slug, author }) => {
  const newDate = new Date(date).toUTCString();
  const dateString = newDate.split(" ").slice(0, 4).join(" ");
  return (
    <article className="container">
      <Link href={`/blog/${slug}`} passHref>
        <a className="nav-link" activeclassname="active" href="replace">
          <h3>{title}</h3>
          <small>
            {dateString} | {author}
          </small>
          <p>{description}</p>
        </a>
      </Link>
    </article>
  );
};

PostList.propTypes = {
  date: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  slug: PropTypes.string,
  author: PropTypes.string,
};

export default PostList;
