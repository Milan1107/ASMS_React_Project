import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import "./ProductCard.css";
import { NavLink } from "react-router-dom";
import { useCart } from "./CartContext"; // Import useCart

const ProductCard = ({ productId, name, category, qty, status, price, weight, rating }) => {
  const [imageUrl, setImageUrl] = useState("");
  const { cartDispatch } = useCart(); // Get cartDispatch from context

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`http://localhost:8080/upload/get-image/${name}`);
        const data = await response.json();
        if (data.imageUrl) {
          setImageUrl(data.imageUrl);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [name]);

  // Function to add product to cart
  const addToCart = () => {
    cartDispatch({
      type: "ADD_TO_CART",
      payload: { 
        id: productId, 
        name, 
        price, 
        quantity: 1, 
        image: imageUrl // Ensure image URL is stored correctly
      },
    });
  };

  return (
    <Card className="product-card shadow-sm">
      <div className="image-container">
        {imageUrl ? (
          <Card.Img variant="top" src={imageUrl} alt={name} className="product-image" />
        ) : (
          <div className="image-placeholder">Loading image...</div>
        )}
      </div>
      <Card.Body className="text-center">
        <Card.Title className="product-title">{name}</Card.Title>
        <Card.Text className="product-category">{category}</Card.Text>
        <Card.Text className="product-status">{status}</Card.Text>
        <Card.Text className="product-price">₹{price}</Card.Text>
        <NavLink to="/cart">
          <Button variant="light" className="order-button" onClick={addToCart}>
            <FaShoppingCart className="cart-icon" /> Add to Cart
          </Button>
        </NavLink>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
