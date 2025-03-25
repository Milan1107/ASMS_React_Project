import { useState } from "react";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useCart } from "./CartContext"; // Import useCart
import "./Cart.css"; // Import the CSS file

const Cart = () => {
  const { cart, cartDispatch } = useCart(); // Fetch cart data from context
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message
  const navigate = useNavigate();

  // Calculate subtotal dynamically
  const getSubtotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Remove item from cart
  const removeItem = (id) => {
    cartDispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  // Update quantity
  const updateQuantity = (id, change) => {
    const item = cart.find((i) => i.id === id);
    if (item) {
      cartDispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: item.quantity + change } });
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      setErrorMessage("Please add items to your cart before proceeding.");
      return;
    }
    setErrorMessage(""); // Clear error if cart has items
    navigate("/payment-gateway");
  };

  return (
    <section className="section">
      <div className="container">
        <h2 className="text-center mb-4">Your Cart</h2>
        <div className="row">
          <div className="col-md-8">
            {cart.length === 0 ? (
              <h4 className="text-center text-muted">Your cart is empty</h4>
            ) : (
              <div className="cart-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Unit Price</th>
                      <th>Qty</th>
                      <th>Subtotal</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img 
                              src={item.image} // Fix: Use correct key for image
                              alt={item.name} 
                              className="product-image" 
                              onError={(e) => { e.target.src = "/placeholder.jpg"; }} // Fallback for broken images
                            />
                            <div className="ms-3">
                              <strong>{item.name}</strong>
                              <br />
                              <Rating value={item.rating} readOnly size="small" />
                            </div>
                          </div>
                        </td>
                        <td>₹{item.price}</td>
                        <td>
                          <div className="quantity-container">
                            <button onClick={() => updateQuantity(item.id, -1)}>
                              <FaMinus />
                            </button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)}>
                              <FaPlus />
                            </button>
                          </div>
                        </td>
                        <td>₹{item.price * item.quantity}</td>
                        <td>
                          <button className="btn-remove" onClick={() => removeItem(item.id)}>
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Cart Summary Section */}
          <div className="col-md-4">
            <div className="cart-summary">
              <h4>Cart Summary</h4>
              <p className="total-price">Total: ₹{getSubtotal()}</p>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <button className="btn-checkout" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
