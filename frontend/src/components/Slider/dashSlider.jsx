import Slider from "react-slick";
import "./dashSlider.css";

const DashSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img src="../assets/d6_dash.jpg" alt="dash_1" />
        </div>
        <div>
          <img src="../assets/d7_dash.jpg" alt="dash_2" />
        </div>
        <div>
          <img src="../assets/d3_dash.jpg" alt="dash_3" />
        </div>
        <div>
          <img src="../assets/d4_dash.jpg" alt="dash_4" />
        </div>
        <div>
          <img src="../assets/d5_dash.jpg" alt="dash_5" />
        </div>
      </Slider>
    </div>
  );
};

export default DashSlider;