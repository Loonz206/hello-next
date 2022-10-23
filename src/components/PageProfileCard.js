/* eslint-disable react/no-unknown-property */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";
import Logo from "../assets/logo.svg";

const PageProfileCard = ({ twitterHandle, jobRole }) => {
  const handle = `https://twitter.com/${twitterHandle}`;
  return (
    <div className="card-container">
      <Link href="/" passHref>
        <a className="nav-link" activeclassname="active" href="replace">
          <Image
            src={Logo}
            alt="logo"
            className="svg"
            layout="responsive"
            width={200}
            height={200}
          />
          {jobRole}
        </a>
      </Link>
      <br />
      <Link href={handle} passHref>
        <a href="replace" target="_blank">
          {twitterHandle}
        </a>
      </Link>
    </div>
  );
};

PageProfileCard.propTypes = {
  jobRole: PropTypes.string,
  twitterHandle: PropTypes.string,
};

export default PageProfileCard;
