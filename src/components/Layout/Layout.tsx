import { useState } from "react";
import PropTypes from "prop-types";
import Header from "../Header/Header";
import PageProfileCard from "../PageProfileCard/PageProfileCard";
import Footer from "../Footer/Footer";

const Layout = ({ children, links }) => {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    return active === false ? setActive(true) : setActive(false);
  };

  return (
    <div className={active === false ? "wrap" : "wrap active"} id="wrap">
      <Header handleClick={() => handleClick} active={active} links={links} />
      <main id="content" role="main">
        <PageProfileCard
          jobRole="Software Engineer & Internet Lover"
          twitterHandle="@loonz206"
        />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  children: [],
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
