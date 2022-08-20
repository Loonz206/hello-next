import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import Image from "next/image";

const PostList = ({ date, title, description, slug, imageCover }) => {
  const newDate = new Date(date).toUTCString();
  const dateString = newDate.split(" ").slice(0, 4).join(" ");
  return (
    <article>
      <Link href={`/blog/${slug}`} passHref>
        <a className="nav-link" activeclassname="active" href="replace">
          <h2>{title}</h2>
          <small>{dateString} | Lenny Peters</small>
          <Image
            layout="intrinsic"
            src={imageCover || "https://place-hold.it/720x405"}
            width={720}
            height={405}
            alt="a grey frame"
          />
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
  author: PropTypes.shape(),
};

export default PostList;
