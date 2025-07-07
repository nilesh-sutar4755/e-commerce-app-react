import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";
import Cart from "../pages/cart/Cart";
import Products from "../pages/products/Products";
import ProductDetails from "../pages/products/ProductDetails";
import AccessDenied from "../pages/AccessDenied";
import ProtectedRoutes from "./ProtectedRoutes";
import SignIn from "../pages/auth/SignIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: "/cart",
        element: <ProtectedRoutes element={<Cart />} />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/access-denied",
        element: <AccessDenied />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;
