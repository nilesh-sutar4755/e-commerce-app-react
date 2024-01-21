import { Product } from "../layouts/RootLayout";
import useCart from "../hooks/useCart";
import { Link } from "react-router-dom";

const Cart = () => {
  const { context, handleCart } = useCart();

  const removeItem = (product: Product, action: string) => {
    if (confirm("Are you sure, you want to delete this item ?")) {
      handleCart(product, action);
    }
  };

  return (
    <div>
      {context.cartItems.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Product Image </th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Total</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {context.cartItems.map((product: Product) => (
              <tr key={product.id}>
                <td>
                  <Link to={`/products/${product.id.toString()}`}>
                    <img
                      src={product.thumbnail}
                      alt="Product Image"
                      width="100px"
                      height="50px"
                    />
                  </Link>
                </td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.title}</td>
                <td>
                  <a
                    className="btn btn-link"
                    onClick={() => removeItem(product, "remove")}
                  >
                    <span className="material-icons">delete</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}></td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleCart(context.cartItems[0], "empty")}
                >
                  Empty Cart
                </button>
              </td>
              <td>
                <button className="btn btn-success">Checkout</button>
              </td>
              <td>
                Grand Total :{" "}
                {context.cartItems.reduce(
                  (acc: any, red: any) => acc + red.price,
                  0
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      ) : (
        <div className="card text-center my-3 p-4">
          <div className="card-body">
            <h4>Your cart is empty!</h4>
            <h6 className="my-3">Add items to it now</h6>
            <Link className="btn btn-primary" to="/products">
              Shop Now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
