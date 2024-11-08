import React from 'react';
import Carousel from './Carousel';
import './PhotoGallery.css'; // Import CSS file

const PhotoGallery = () => {
  return (
    <div className="gallary-section">
      <div className="gallery-container">
        <h2 className="gallery-title">Events Gallery</h2>
        <hr style={{marginTop: '2.15rem', border: '1px solid white', opacity: 1}} />
        <Carousel />
      </div>
    </div>
  );
};

export default PhotoGallery;
