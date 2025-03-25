// import { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Card, Button } from "react-bootstrap";
// import { FaShoppingCart } from "react-icons/fa";
// import "./ProductCard.css";

// const ProductCard = ({ productId, name, category, qty, status, price }) => {
//   const [imageUrl, setImageUrl] = useState("");

//   useEffect(() => {
//     const fetchImage = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/upload/get-image/${name}`);
//         const data = await response.json();
//         if (data.imageUrl) {
//           setImageUrl(data.imageUrl);
//         }
//       } catch (error) {
//         console.error("Error fetching image:", error);
//       }
//     };

//     fetchImage();
//   }, [name]);

//   return (
//     <Card className="product-card shadow-sm">
//       <div className="image-container">
//         {imageUrl ? (
//           <Card.Img variant="top" src={imageUrl} alt={name} className="product-image" />
//         ) : (
//           <div className="image-placeholder">Loading image...</div>
//         )}
//       </div>
//       <Card.Body>
//         <Card.Title className="product-title">{name}</Card.Title>
//         <Card.Text className="product-category">Category: {category}</Card.Text>
//         <Card.Text className="product-id">Product ID: {productId}</Card.Text>
//         <Card.Text className={`product-status ${status !== "Available" ? "low-stock" : "in-stock"}`}>
//           {status}
//         </Card.Text>
//         <Card.Text className="product-qty">Quantity: {qty} units</Card.Text>
//         <Card.Text className="product-price">₹{price}</Card.Text>
//         <Button variant="primary" className="order-button">
//           <FaShoppingCart className="cart-icon" /> Add to Cart
//         </Button>
//       </Card.Body>
//     </Card>
//   );
// };

// export default ProductCard;



import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
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
        <Button variant="light" className="order-button">
          <FaShoppingCart className="cart-icon" /> Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
