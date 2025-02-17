import "./ProductCard.css";

const ProductCard = ({
  image,
  name,
  stock,
  price,
  minOrderQty,
  category,
  sku,
  bulkDiscount,
  deliveryTime,
}) => {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <div className="product-details">
        <h3 className="product-name">{name}</h3>
        <p className="product-category">Category: {category}</p>
        <p className="product-sku">SKU: {sku}</p>
        <p className={`product-stock ${stock < 50 ? "low-stock" : ""}`}>
          Stock: {stock} units
        </p>
        <p className="product-delivery">Delivery: {deliveryTime}</p>
        <p className="product-price">Wholesale Price: ₹{price} per unit</p>
        {bulkDiscount && (
          <p className="product-bulk-discount">Bulk Discount: {bulkDiscount}</p>
        )}
        <p className="product-min-order">Min Order: {minOrderQty} units</p>
        <div className="order-quantity">
          <input
            type="number"
            min={minOrderQty}
            step={minOrderQty}
            placeholder={`Min: ${minOrderQty}`}
            className="quantity-input"
          />
        </div>
        <button className="order-now">Order Now</button>
      </div>
    </div>
  );
};

export default ProductCard;
