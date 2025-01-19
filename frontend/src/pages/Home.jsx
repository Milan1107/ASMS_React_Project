import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import "./Home.css";
import Slider from "../components/Slider/dashSlider";

const Home = () => {
  const products = [
    { id: 1, image: "../assets/medimixx.jpeg", name: "Medimix Soap" },
    { id: 2, image: "colgate.png", name: "Colgate Toothpaste" },
    { id: 3, image: "medimix.png", name: "Medimix Soap" },
    { id: 4, image: "colgate.png", name: "Colgate Toothpaste" },
  ];

  return (
    <div>
      <Header />
      <br />
      <Slider/>
      <div className="products">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            image={product.image} 
            name={product.name} 
          />
        ))}
      </div>
      <div className="products">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            image={product.image} 
            name={product.name} 
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
