import Link from "next/link";

interface Props {
  active: boolean;
  handleClick: () => void;
  links: { id: number; name: string; path: string }[];
}

const Header = ({ links, handleClick, active }: Props) => {
  const renderLinks = links.map(({ path, name, id }) => (
    <li key={id}>
      <Link href={path} className="nav-link active" passHref>
        {name}
      </Link>
    </li>
  ));

  return (
    <header>
      <a href="#content" className="sr-only">
        Skip to Content
      </a>
      <a
        href="#menu"
        className={active === false ? "menu-link" : "menu-link active"}
        onClick={() => handleClick()}
      >
        menu &#x2630;
      </a>
      <nav
        id="menu"
        className={active === false ? "" : "active"}
        role="navigation"
      >
        <ul className="overlay-content">
          <li>
            <a href="#menu" className="closebtn" onClick={() => handleClick()}>
              close &#x2715;
            </a>
          </li>
          {renderLinks}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
