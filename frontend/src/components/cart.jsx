import { useState } from "react";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import "./Cart.css"; // Import the CSS file

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Ponds Moisturiser",
      image: "/assets/Ponds.jpg",
      price: 300,
      quantity: 5,
      rating: 4,
    },
    {
      id: 2,
      name: "Nivea Cream",
      image: "/assets/Ponds.jpg",
      price: 250,
      quantity: 2,
      rating: 4.5,
    },
  ]);

  const [errorMessage, setErrorMessage] = useState(""); // State to store error message
  const navigate = useNavigate();

  // Calculate subtotal
  const getSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Update quantity
  const updateQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
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
            {cartItems.length === 0 ? (
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
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img src={item.image} alt={item.name} className="product-image" />
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
