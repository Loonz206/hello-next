import React from "react";
import Link from "next/link";

const PageProfileCard = () => {
  return (
    <div className="card-container">
      <Link href="/" passHref>
        <a className="nav-link" activeclassname="active" href="replace">
          <img
            className="img-responsive"
            src="https://placehold.it/350x350"
            alt="logo"
          />
          UX/UI Designer & Front-End Developer
        </a>
      </Link>
      <br />
      <Link href="https://twitter.com/loonz206" passHref>
        <a href="replace">@loonz206</a>
      </Link>
    </div>
  );
};

export default PageProfileCard;
