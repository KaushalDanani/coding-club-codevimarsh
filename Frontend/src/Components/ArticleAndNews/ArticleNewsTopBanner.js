import React, { useState } from "react";
import "./ArticleNewsTopBanner.css";
import ArticleNewsNav from "./ArticleNewsNav";
import "bootstrap/dist/css/bootstrap.css";
// import { event } from "jquery";
import "bootstrap"
// import NewsBanner from "../images/NewsBanner.jpg"

function ArticleNewsTopBanner(props) {

  const [isArticleSelected,setArticleSelected] = useState(true);

  function onSelect(isSelected) {

    if (isSelected === true) {
      if(!isArticleSelected)
      {
      document.getElementById("ArticleButton").click();
      setArticleSelected(true); 
      props.onChange(true); 
      }
    
    } else {
      if(isArticleSelected)
      {
        document.getElementById("NewsButton").click();
        setArticleSelected(false);
        props.onChange(false);
      }
    }
  }

  const CarouselStyle = {
    position : "absolute",
    backgroundColor : "pink",
    height : "100%"
  }

  return (
    <div className="TopBanner">
        <div id="carouselExample" className="carousel slide CarouselStyle">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/images/articles.jpg" className="d-block BannerIcon" alt="Article Banner" loading="lazy" />
            </div>
            <div className="carousel-item">
              <img src="/images/news.png" className="d-block BannerIcon " alt="News Banner" loading="lazy" />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            id="ArticleButton"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
            style={{display : "none"}}
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            id="NewsButton"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
            style={{display : "none"}}
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      <ArticleNewsNav onChange={onSelect} />
    </div>
  );
}

export default ArticleNewsTopBanner;
