import { Link, NavLink } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import { useEffect, useState } from "react";
interface Props {
  cartCount: number;
}
const NavBar = ({ cartCount }: Props) => {
  const [isClass, setClass] = useState(false);

  useEffect(() => {
    setClass(true);
    setTimeout(() => setClass(false), 1000);
  }, [cartCount]);

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand">
            <img src={reactLogo} alt="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#myNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="navbar-nav ms-auto pe-2">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">
                  <span className="material-icons">shopping_cart</span>
                  {cartCount > 0 && (
                    <span
                      className={
                        isClass
                          ? "badge bg-primary cart-icon shake"
                          : "badge bg-primary cart-icon"
                      }
                    >
                      {cartCount}
                    </span>
                  )}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
