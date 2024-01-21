import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import products from "../data/products";
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  isAddedToCart: boolean;
  quantity: number;
}

const RootLayout = () => {
  const [_products, setProducts] = useState<Product[]>([...products]);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const cartItems = _products.filter((item) => item.isAddedToCart);
    setCartCount(cartItems.length);
    setCartItems([...cartItems]);
  }, [_products]);

  return (
    <>
      <NavBar cartCount={cartCount} />
      <main>
        <div className="container">
          <Outlet context={{ _products, setProducts, cartItems }} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
