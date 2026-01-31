import Link from "next/link";
import Image from "next/image";
import Logo from "../../assets/logo.svg";

type Props = {
  active: boolean;
  handleClick: () => void;
  links: { id: number; name: string; path: string }[];
};

const Header = ({ links, handleClick, active }: Props) => {
  const renderLinks = links.map(({ path, name, id }) => (
    <li key={id}>
      <Link
        href={path}
        className="nav-link"
        passHref
        onClick={() => {
          // Close menu on mobile after clicking a link
          if (active) handleClick();
        }}
      >
        {name}
      </Link>
    </li>
  ));

  return (
    <header className="header">
      <a href="#content" className="sr-only">
        Skip to Content
      </a>

      {/* Brand Logo */}
      <Link href="/" className="header-brand" passHref>
        <Image
          src={Logo}
          alt="Lenny Peters"
          className="brand-logo"
          width={40}
          height={40}
          priority={true}
        />
        <span className="brand-name">Lenny Peters</span>
      </Link>

      {/* Hamburger Menu Button */}
      <button
        className={`hamburger ${active ? "active" : ""}`}
        onClick={handleClick}
        aria-label="Toggle navigation menu"
        aria-expanded={active}
        aria-controls="menu"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {/* Navigation Menu */}
      <nav
        id="menu"
        className={`nav-menu ${active ? "active" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <ul className="nav-list">{renderLinks}</ul>
      </nav>

      {/* Mobile Menu Overlay */}
      {active && (
        <div
          className="menu-overlay"
          onClick={handleClick}
          aria-hidden="true"
        ></div>
      )}
    </header>
  );
};

export default Header;
