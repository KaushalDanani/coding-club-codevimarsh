import React from 'react';
import ImageCard from './ImageCard';
import { imageData } from './imageData'; // Import the image data from JS file
import './Carousel.css'; // Import CSS file

const Carousel = () => {
  return (
    <div className="carousel">
      <div className="image-grid">
        {imageData.map((item, index) => (
          <ImageCard key={index} url={item.url} text={item.text} />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
