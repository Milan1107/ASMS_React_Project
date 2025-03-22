import { useState, useEffect } from "react";
import "./ProductCard.css";

const ProductCard = ({ productId, name, category, qty, status, price }) => {
  const [imageUrl, setImageUrl] = useState("");

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

  return (
    <div className="product-card">
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="product-image" />
      ) : (
        <p>Loading image...</p>
      )}
      <div className="product-details">
        <h3>{name}</h3>
        <p>Category: {category}</p>
        <p>Product ID: {productId}</p>
        <p className={`product-status ${status !== "Available" ? "low-stock" : ""}`}>
          {status}
        </p>
        <p>Quantity: {qty} units</p>
        <p className="product-price">₹{price}</p>
        <button className="order-now">Order Now</button>
      </div>
    </div>
  );
};

export default ProductCard;
