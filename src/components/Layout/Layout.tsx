import { useState } from "react";
import Header from "../Header/Header";
import PageProfileCard from "../PageProfileCard/PageProfileCard";
import Footer from "../Footer/Footer";

type LayoutProps = {
  children: React.ReactNode;
  links: Array<{ id: number; name: string; path: string }>;
};

const Layout = ({ children, links }: LayoutProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div id="app-container">
      <Header handleClick={handleMenuToggle} active={menuOpen} links={links} />
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
