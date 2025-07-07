import { useOutletContext } from "react-router-dom";
import products from "../data/products";
import { useCallback } from "react";
import { Product } from "../utils/Interfaces";

const useCart = () => {
    const context: any = useOutletContext();
    console.log(context)
    const handleCart = useCallback((product?: Product, action = "add") => {
        const isProductInCart = context._products.some((p: Product) => p.id === product?.id);

        switch (action) {
            case "add":
            case "remove":
                const isAddedToCart =
                    action === "add"
                        ? true
                        : action === "remove" && isProductInCart
                            ? false
                            : false;

                const updatedProducts = isProductInCart
                    ? context._products.map((p: Product) =>
                        p.id === product?.id ? { ...p, isAddedToCart: isAddedToCart, quantity: 1 } : p
                    )
                    : [...context._products, { ...product, isAddedToCart: isAddedToCart, quantity: 1 }];

                context.setProducts(updatedProducts);
                localStorage.setItem("products", JSON.stringify(updatedProducts))
                break;
            case "updateQuantity":
                if (isProductInCart) {
                    const updatedProducts = context._products.map((p: Product) =>
                        p.id === product?.id ? { ...p, quantity: product?.quantity } : p
                    );
                    context.setProducts(updatedProducts);
                    localStorage.setItem("products", JSON.stringify(updatedProducts))
                }
                break;
            case "empty":
                context.setProducts([...products]);
                localStorage.setItem("products", JSON.stringify(products))
                break;

            default:
                break;
        }
    }, [context]);

    return { context, handleCart };
};

export default useCart;
