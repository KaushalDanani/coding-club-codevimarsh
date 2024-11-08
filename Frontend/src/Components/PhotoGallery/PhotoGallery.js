import React from 'react';
import Carousel from './Carousel';
import './PhotoGallery.css'; // Import CSS file

const PhotoGallery = () => {
  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Photo Gallery</h1>
      <Carousel />
    </div>
  );
};

export default PhotoGallery;
