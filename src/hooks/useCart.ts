import { useOutletContext } from "react-router-dom";
import products from "../data/products";
import { Product } from "../layouts/RootLayout";
import { useCallback } from "react";

const useCart = () => {
    const context: any = useOutletContext();
    const handleCart = useCallback((product?: Product, action = "add") => {
        if (action == "add" || action == "remove") {
            // Check if the product is already in the cart
            const isProductInCart = context._products.some(
                (p: Product) => p.id === product?.id
            );
            const isAddedToCart =
                action == "add"
                    ? true
                    : action == "remove" && isProductInCart
                        ? false
                        : false;
            // Update the product if it's in the cart, otherwise add it
            const updatedProducts = isProductInCart
                ? context._products.map((p: Product) =>
                    p.id === product?.id ? { ...p, isAddedToCart: isAddedToCart } : p
                )
                : [...context._products, { ...product, isAddedToCart: isAddedToCart }];

            context.setProducts(updatedProducts);
        } else if (action == "empty") {
            context.setProducts([...products]);
        }
    }, [context]);
    return { context, handleCart }
}

export default useCart