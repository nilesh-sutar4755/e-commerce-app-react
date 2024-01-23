import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();

  let currentLink = "";

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, index) => {
      currentLink += `/${crumb}`;

      return (
        <div className="crumb" key={index}>
          <Link to={currentLink}>{crumb}</Link>
        </div>
      );
    });

  return (
    <>{crumbs.length > 0 && <div className="breadcrumbs">{crumbs}</div>}</>
  );
};

export default Breadcrumbs;
