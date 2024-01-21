const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-dark navbar-dark fixed-bottom p-3 text-center">
      <span className="navbar-brand">Copyright© {currentYear}</span>
    </footer>
  );
};

export default Footer;
