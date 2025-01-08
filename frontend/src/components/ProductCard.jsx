import "./ProductCard.css";

const ProductCard = ({ image, name }) => {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" /> {/* Correctly referencing the public folder */}
      <p>{name}</p>
    </div>
  );
};

export default ProductCard;
