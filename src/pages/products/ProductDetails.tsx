import { Link, useParams } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { useEffect, useRef, useState } from "react";
import Reviews from "./Reviews";
import { Product } from "../../utils/Interfaces";

const ProductDetails = () => {
  const { context, handleCart } = useCart();
  const [product, setProductItem] = useState<Product | undefined>();
  const { id } = useParams();

  const ref = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Check if context and _products are available
    if (context?._products && id) {
      // Find the product by id
      const foundProduct = context._products.find(
        (item: Product) => item.id === +id
      );

      // Update the state with the found product
      if (foundProduct) {
        setProductItem(foundProduct);
      }
    }
  }, [context, id]);
  return (
    <div>
      <div className="row">
        {product && (
          <div className="col-12">
            <div className="card p-card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <img
                      className="card-img-top"
                      src={product?.thumbnail}
                      alt="Card image cap"
                    />
                  </div>
                  <div className="col-md-8">
                    <h4 className="card-title">{product?.title}</h4>
                    <div>
                      <span
                        onClick={handleClick}
                        className="badge bg-success cursor-pointer my-3 me-3 p-2 text-white d-inline-flex align-items-center"
                      >
                        {product?.rating.toFixed(1)}
                        <span className="material-icons ms-1 fs-6">star</span>
                      </span>
                      <span className="badge bg-primary-subtle my-3 p-2 text-black">
                        {product?.category}
                      </span>
                    </div>
                    <p className="card-text">{product?.description}</p>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <h4>
                          ₹{product?.price}
                          <span className="text-black-50 text-decoration-line-through ms-2 fs-6">
                            {product?.discountPercentage}% off
                          </span>
                        </h4>
                      </li>
                      <li className="list-group-item">
                        {product?.isAddedToCart ? (
                          <div className="d-flex justify-content-between">
                            <Link className="btn btn-dark d-flex" to={"/cart"}>
                              Go to cart
                              <span className="material-icons ms-2">
                                call_missed_outgoing
                              </span>
                            </Link>
                            <button
                              className="btn btn-danger d-flex"
                              onClick={() => handleCart(product, "remove")}
                            >
                              Remove
                              <span className="material-icons ms-2">
                                remove
                              </span>
                            </button>
                          </div>
                        ) : (
                          <button
                            className="btn btn-primary d-flex"
                            onClick={() => handleCart(product, "add")}
                          >
                            Add to cart
                            <span className="material-icons ms-2">
                              add_shopping_cart
                            </span>
                          </button>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="reviews" ref={ref}>
              <h5 className="mb-3">Reviews</h5>
              <Reviews id={product.id.toString()} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
