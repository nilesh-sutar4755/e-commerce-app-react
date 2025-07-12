import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import products from "../data/products";
import { Product } from "../utils/Interfaces";
import Breadcrumbs from "../components/Breadcrumbs";

const RootLayout = () => {
  const [_products, setProducts] = useState<Product[]>([...products]);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    // let products = (JSON.parse(
    //   localStorage.getItem("products") || "[]"
    // ) as Product[]) || 
    // [..._products];
    setProducts([...products]);
  }, []);

  useEffect(() => {
    const cartItems = _products.filter((item) => item.isAddedToCart);
    setCartCount(cartItems.length);
    setCartItems([...cartItems]);
  }, [_products]);

  return (
    <>
      <NavBar cartCount={cartCount} products={_products} />
      <main>
        <div className="container-fluid">
          <Breadcrumbs />
          <Outlet context={{ _products, setProducts, cartItems }} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
