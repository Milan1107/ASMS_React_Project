// import { useState } from "react";
// import Rating from "@mui/material/Rating";
// import { useNavigate } from "react-router-dom";
// import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
// import { useCart } from "./CartContext";
// import "./Cart.css";

// const Cart = () => {
//   const { cart, cartDispatch } = useCart();
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   // Calculate subtotal
//   const getSubtotal = () =>
//     cart.reduce((total, item) => total + item.price * item.quantity, 0);

//   // Remove item from cart
//   const removeItem = (id) => {
//     cartDispatch({ type: "REMOVE_FROM_CART", payload: id });
//   };

//   // Update quantity
//   const updateQuantity = (id, newQuantity) => {
//     cartDispatch({
//       type: "UPDATE_QUANTITY",
//       payload: { id, newQuantity },
//     });
//   };

//   const handleCheckout = () => {
//     if (cart.length === 0) {
//       setErrorMessage("Please add items to your cart before proceeding.");
//       return;
//     }
//     setErrorMessage("");
//     navigate("/payment-gateway");
//   };

//   return (
//     <section className="section">
//       <div className="container">
//         <h2 className="text-center mb-4">Your Cart</h2>
//         <div className="row">
//           <div className="col-md-8">
//             {cart.length === 0 ? (
//               <h4 className="text-center text-muted">Your cart is empty</h4>
//             ) : (
//               <div className="cart-container">
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       <th>Product</th>
//                       <th>Unit Price</th>
//                       <th>Qty</th>
//                       <th>Subtotal</th>
//                       <th>Remove</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {cart.map((item) => (
//                       <tr key={item.id}>
//                         <td>
//                           <div className="d-flex align-items-center">
//                             <img
//                               src={item.image}
//                               alt={item.name}
//                               className="product-image"
//                               onError={(e) => { e.target.src = "/placeholder.jpg"; }}
//                             />
//                             <div className="ms-3">
//                               <strong>{item.name}</strong>
//                               <br />
//                               <Rating value={item.rating} readOnly size="small" />
//                             </div>
//                           </div>
//                         </td>
//                         <td>₹{item.price}</td>
//                         <td>
//                           <div className="quantity-container">
//                             <button
//                               onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
//                             >
//                               <FaMinus />
//                             </button>
//                             <span>{item.quantity}</span>
//                             <button
//                               onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                             >
//                               <FaPlus />
//                             </button>
//                           </div>
//                         </td>
//                         <td>₹{item.price * item.quantity}</td>
//                         <td>
//                           <button className="btn-remove" onClick={() => removeItem(item.id)}>
//                             <FaTrash />
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>

//           {/* Cart Summary Section */}
//           <div className="col-md-4">
//             <div className="cart-summary">
//               <h4>Cart Summary</h4>
//               <p className="total-price">Total: ₹{getSubtotal()}</p>
//               {errorMessage && <p className="error-message">{errorMessage}</p>}
//               <button className="btn-checkout" onClick={handleCheckout}>
//                 Proceed to Checkout
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Cart;






import { useState } from "react";
import Rating from "@mui/material/Rating";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useCart } from "./CartContext";
import axios from "axios";
import "./Cart.css";

const Cart = () => {
  const { cart, cartDispatch } = useCart();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { state : productId} = useLocation();

  // Calculate subtotal
  const getSubtotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Remove item from cart
  const removeItem = (id) => {
    cartDispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    cartDispatch({
      type: "UPDATE_QUANTITY",
      payload: { id, newQuantity },
    });
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      setErrorMessage("Please add items to your cart before proceeding.");
      return;
    }
  
    const orderData = {
      items: cart.map((item) => ({
        productId: productId, // Use _id here
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalPrice: getSubtotal(),
      customerId: "67cb0de3389e8d12d178dd12",
    };
  console.log(orderData);
    try {
      const response = await axios.post(
        "http://localhost:8080/orders/place",
        orderData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
  
      if (response.status === 201) {
        alert("Order placed successfully!");
        cartDispatch({ type: "CLEAR_CART" });
        navigate("/order-success");
      } else {
        setErrorMessage("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setErrorMessage("Server error. Please try again later.");
    }
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
                      <tr key={item._id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="product-image"
                              onError={(e) => {
                                e.target.src = "/placeholder.jpg";
                              }}
                            />
                            <div className="ms-3">
                              <strong>{item.name}</strong>
                              <br />
                              <Rating
                                value={item.rating}
                                readOnly
                                size="small"
                              />
                            </div>
                          </div>
                        </td>
                        <td>₹{item.price}</td>
                        <td>
                          <div className="quantity-container">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item._id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                            >
                              <FaMinus />
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(item._id, item.quantity + 1)
                              }
                            >
                              <FaPlus />
                            </button>
                          </div>
                        </td>
                        <td>₹{item.price * item.quantity}</td>
                        <td>
                          <button
                            className="btn-remove"
                            onClick={() => removeItem(item._id)}
                          >
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
