import { useState } from "react";
import Header from "../Header/Header";
import PageProfileCard from "../PageProfileCard/PageProfileCard";
import Footer from "../Footer/Footer";

type LayoutProps = {
  children: React.ReactNode;
  links: Array<{ id: number; name: string; path: string }>;
};

const Layout = ({ children, links }: LayoutProps) => {
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

export default Layout;
