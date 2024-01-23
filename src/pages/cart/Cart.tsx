import useCart from "../../hooks/useCart";
import { Link } from "react-router-dom";
import { Product } from "../../utils/Interfaces";

const Cart = () => {
  const { context, handleCart } = useCart();

  const removeItem = (product: Product, action: string) => {
    if (confirm("Are you sure, you want to delete this item ?")) {
      handleCart(product, action);
    }
  };

  const updateQuantity = (product: Product, action: string) => {
    let newProduct = product;
    if (action == "add") {
      newProduct.quantity += 1;
    } else if (action == "remove") {
      newProduct.quantity -= 1;
    }
    if (newProduct.quantity == 0) {
      removeItem(newProduct, "remove");
      newProduct.quantity += 1;
      return;
    }
    handleCart(newProduct, "updateQuantity");
  };

  const grandTotal = context.cartItems.reduce(
    (acc: any, product: Product) => acc + product.quantity * product.price,
    0
  );

  return (
    <div>
      {context.cartItems.length > 0 ? (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Product Image </th>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
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
                  <td>
                    <button
                      className="btn btn-sm btn-outline-secondary py-0"
                      onClick={() => updateQuantity(product, "add")}
                    >
                      <span className="material-icons fs-6 mt-2">add</span>
                    </button>
                    <span className="mx-3">{product.quantity}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary py-0"
                      onClick={() => updateQuantity(product, "remove")}
                    >
                      <span className="material-icons fs-6 mt-2">remove</span>
                    </button>
                  </td>
                  <td>{product.quantity * product.price}</td>
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
                <td colSpan={3}></td>
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
                <td>Grand Total :{grandTotal}</td>
              </tr>
            </tfoot>
          </table>
        </div>
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
