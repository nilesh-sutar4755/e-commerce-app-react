import useCart from "../../hooks/useCart";
import { Link } from "react-router-dom";
import { Product } from "../../utils/Interfaces";
import { useMemo } from "react";

const Cart = () => {
  const { context, handleCart } = useCart();

  const removeItem = (product: Product, action: string) => {
    const message =
      action == "remove"
        ? "Are you sure, you want to delete this item ?"
        : "Are you sure, you want to delete all items ?";
    if (confirm(message)) {
      handleCart(product, action);
    }
  };

  const updateQuantity = (product: Product, action: string) => {
    const newProduct = product;
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

  const grandTotal: number = useMemo(
    () =>
      context.cartItems.reduce(
        (acc: number, product: Product) =>
          acc + product.quantity * product.price,
        0
      ),
    [context]
  );

  const cgst: number = useMemo(() => grandTotal * 0.09, [grandTotal]); // 9% CGST
  const sgst: number = useMemo(() => grandTotal * 0.09, [grandTotal]); // 9% SGST
  const finalTotal: number = useMemo(() => grandTotal + cgst + sgst, [grandTotal, cgst, sgst]);

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
                <td colSpan={4}></td>
                <td><strong>Subtotal:</strong></td>
                <td><strong>₹{grandTotal.toFixed(2)}</strong></td>
              </tr>
              <tr>
                <td colSpan={4}></td>
                <td>CGST (9%):</td>
                <td>₹{cgst.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan={4}></td>
                <td>SGST (9%):</td>
                <td>₹{sgst.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeItem(context.cartItems[0], "empty")}
                  >
                    Empty Cart
                  </button>
                </td>
                <td colSpan={2}>
                  <button className="btn btn-success">Checkout</button>
                </td>
                <td><strong>Final Total:</strong></td>
                <td><strong>₹{finalTotal.toFixed(2)}</strong></td>
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
