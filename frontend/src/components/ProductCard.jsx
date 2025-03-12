import "./ProductCard.css";

const ProductCard = ({
  productId,
  name,
  category,
  weight,
  qty,
  status,
  description,
  price,
  expiryDate,
}) => {
  return (
    <div className="product-card">
      <div className="product-details">
        <h3 className="product-name">{name}</h3>
        <p className="product-category">Category: {category}</p>
        <p className="product-id">Product ID: {productId}</p>
        <p className="product-weight">Weight: {weight}</p>
        <p className={`product-status ${status !== "Available" ? "low-stock" : ""}`}>
          Status: {status}
        </p>
        <p className="product-qty">Quantity: {qty} units</p>
        <p className="product-expiry">Expiry Date: {expiryDate}</p>
        <p className="product-price">Price: ₹{price}</p>
        {description && (
          <p className="product-description">Description: {description}</p>
        )}
        <button className="order-now">Order Now</button>
      </div>
    </div>
  );
};

export default ProductCard;
