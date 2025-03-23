import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./dashSlider.css";

const DashSlider = () => {
  const settings = {
    dots: false, // Remove dots for a cleaner look
    infinite: true,
    speed: 500,  
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enables auto rotation
    autoplaySpeed: 2000, // Changes slide every 2 seconds
    cssEase: "ease-in-out", // Smooth transition
    arrows: false, // Remove arrows for auto-play focus
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img src="/assets/d9_dash.png" alt="Slide 1" />
        </div>
        <div>
          <img src="/assets/d8_dash.png" alt="Slide 2" />
        </div>
        <div>
          <img src="/assets/d10_dash.png" alt="Slide 3" />
        </div>
      </Slider>
    </div>
  );
};

export default DashSlider;
