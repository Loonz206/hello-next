const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer>
      <p>{`Next Blog | Copyright 2020-${date}`}</p>
    </footer>
  );
};

export default Footer;
