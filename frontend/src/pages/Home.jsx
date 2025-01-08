import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import "./Home.css";

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
      <div className="banner">
        <h1>SPECIAL SALE</h1>
        <h2>BUY NOW!</h2>
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
