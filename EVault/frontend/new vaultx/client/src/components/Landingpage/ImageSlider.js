// ImageSlider.js

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageSlider.css";

const ImageSlider = () => {
  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Slider {...sliderSettings} className="image-slider">
      <div className="slider-item">
        <div className="column"></div>
        <img src="logo.jpg" alt="Slide 1" />
      </div>
      <div className="slider-item">
        <img src="image3.jpg" alt="Slide 2" />

      </div>
      <div className="slider-item">
        <img src="pexels-ekaterina-bolovtsova-6077326.jpg" alt="Slide 2" />
        
      </div>
      {/* Add more slides as needed */}
    </Slider>
  );
};

export default ImageSlider;
