import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import "./Home.css";
import Slider from "../components/Slider/dashSlider";
import Footer from "../components/Footer";
import { message, Spin } from "antd";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Data from Backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/inventory");
      setProducts(response.data);
    } catch (error) {
      message.error("Failed to load products! " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  
return (
  <div>
    <Header />
    <br />
    <Slider />
    <br />
    {loading ? (
      <Spin tip="Loading products..." size="large" />
    ) : (
      <div className="products">
        {products.map((product) => (
          <ProductCard
            key={product.productId}
            image={product.image || "/assets/default-image.jpg"} 
            name={product.name}
            category={product.category}
            weight={product.weight}
            stock={product.qty}
            price={product.price}
            status={product.status}
            expiryDate={product.expiryDate}
          />
        ))}
      </div>
    )}
    <Footer /> {/* ✅ Add Footer Component */}
  </div>
);

};

export default Home;
