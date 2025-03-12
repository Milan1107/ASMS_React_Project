import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Slider from "../components/Slider/dashSlider";
import "./RetailDashboard.css";

const RetailDashboard = () => {
  const products = [
    { id: 1, image: "/assets/medimixx.jpeg", name: "Medimix Soap", stock: 500, price: 35, minOrderQty: 50, category: "Personal Care" },
    { id: 2, image: "/assets/colgate.jpeg", name: "Colgate Toothpaste", stock: 1000, price: 75, minOrderQty: 100, category: "Oral Care" },
  ];

  return (
    <div>
      <Header />
      <Slider />
      <div className="products">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default RetailDashboard;
