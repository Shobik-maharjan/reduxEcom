const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return <div className="text-center my-4">copyright@{year}</div>;
};

export default Footer;
