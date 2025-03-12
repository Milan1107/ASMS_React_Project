// import Header from "../components/Header";
// import ProductCard from "../components/ProductCard";
// import "./Home.css";
// import Slider from "../components/Slider/dashSlider";

// const Home = () => {
//   const products = [
//     {
//       id: 1,
//       image: "/assets/medimixx.jpeg",
//       name: "Medimix Soap",
//       stock: 500,
//       price: 35,
//       minOrderQty: 50,
//       category: "Personal Care",
//       sku: "MED12345",
//       bulkDiscount: "Buy 500+ units at ₹30/unit",
//       deliveryTime: "5-7 business days",
//     },
//     {
//       id: 2,
//       image: "/assets/colgate.jpeg",
//       name: "Colgate Toothpaste",
//       stock: 1000,
//       price: 75,
//       minOrderQty: 100,
//       category: "Oral Care",
//       sku: "COL56789",
//       bulkDiscount: "Buy 1000+ units at ₹70/unit",
//       deliveryTime: "3-5 business days",
//     },
//   ];
//   return (
//     <div>
//       <Header />
//       <br />
//       <Slider />
//       <br/>
//       <div className="products">
//         {products.map((product) => (
//           <ProductCard
//             key={product.id}
//             image={product.image}
//             name={product.name}
//             stock={product.stock}
//             price={product.price}
//             minOrderQty={product.minOrderQty}
//             category={product.category} 
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;



import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import "./Home.css";
import Slider from "../components/Slider/dashSlider";
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
              image={product.image || "/assets/default-image.jpg"} // ✅ Image Handling
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
    </div>
  );
};

export default Home;
