import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { Product } from "../../utils/Interfaces";

const Products = () => {
  const { context, handleCart } = useCart();
  console.log(context)
  return (
    <div className="row">
      {context?._products?.map((product: Product, index: number) => (
        <div className="col-md-4" key={index}>
          <div className="card p-card">
            <Link to={product.id.toString()}>
              <img
                className="card-img-top"
                src={product.thumbnail}
                alt="Card image cap"
              />
            </Link>
            <div className="card-body">
              <h4 className="card-title text-truncate" title={product.title}>
                {product.title}
              </h4>
              <p
                className="card-text text-truncate"
                title={product.description}
              >
                {product.description}
              </p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <h4>
                  ₹{product.price}
                  <span className="text-black-50 text-decoration-line-through ms-2 fs-6">
                    {product.discountPercentage}% off
                  </span>
                </h4>
              </li>
              <li className="list-group-item">
                {product.isAddedToCart ? (
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
                      <span className="material-icons ms-2">remove</span>
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
      ))}
    </div>
  );
};

export default Products;
