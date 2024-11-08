import React from 'react';
import './ImageCard.css'; // Import CSS file

const ImageCard = ({ url, text }) => {
  return (
    <div className="image-card">
      <img src={url} alt="Gallery" className="gallery-image" />
      <div className="image-text">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ImageCard;
