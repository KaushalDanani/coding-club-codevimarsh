import React from 'react';
import './ImageCard.css'; // Import CSS file

const ImageCard = ({ url, text }) => {
  return (
    <div className="image-card">
      <img className="gallery-image" src={url} alt="Gallery" loading='lazy' />
      <div className="image-text">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ImageCard;
