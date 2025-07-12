import { Link, NavLink, useNavigate } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { Product } from "../utils/Interfaces";
interface Props {
  cartCount: number;
  products?: Product[];
}
const NavBar = ({ cartCount, products }: Props) => {
  const [isClass, setClass] = useState(false);
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSignIn = () => {
    if (authenticated) {
      setAuthenticated(false);
      navigate('/'); // Redirect to home after sign out
    } else {
      navigate('/sign-in'); // Navigate to sign in page
    }
  }
  const handleSearch = (value: string) => {
    setSearchValue(value);
    
    if (value.trim() === "") {
      setFilteredProducts(products);
      setShowDropdown(false);
      return;
    }
    
    // Check if products are available
    if (!products || products.length === 0) {
      console.log("Products not available yet");
      return;
    }
    
    const filtered = products.filter((product: Product) =>
      product.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
    setShowDropdown(filtered.length > 0);
  };

  const handleProductSelect = (product: Product) => {
    setSearchValue(product.title);
    setShowDropdown(false);
    navigate(`/products/${product.id}`);
  };

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
          <div className="position-relative" style={{ minWidth: '300px' }}>
            <input 
              type="search" 
              placeholder="Search..." 
              className="form-control" 
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => filteredProducts.length > 0 && setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              style={{ minWidth: '300px' }}
            />
            {showDropdown && filteredProducts.length > 0 && (
              <div 
                className="dropdown-menu show position-absolute w-100" 
                style={{ 
                  top: '100%', 
                  left: 0, 
                  maxHeight: '300px', 
                  overflowY: 'auto',
                  zIndex: 1050
                }}
              >
                {filteredProducts.slice(0, 10).map((product) => (
                  <button
                    key={product.id}
                    className="dropdown-item text-truncate"
                    onClick={() => handleProductSelect(product)}
                    style={{ textAlign: 'left' }}
                  >
                    <div className="d-flex align-items-center">
                      <img 
                        src={product.thumbnail} 
                        alt={product.title}
                        style={{ width: '30px', height: '30px', marginRight: '8px' }}
                        className="rounded"
                      />
                      <span className="text-truncate">{product.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
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
              <li className="nav-item">
                <a className="nav-link" onClick={handleSignIn} >
                  Sign {authenticated ? "Out" : "In"}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
