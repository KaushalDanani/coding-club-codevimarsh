import React from "react";
// import thumbnail from "../images/Potd.png";
// import img1 from "../images/ArticleBanner.jpg";
import "./ArticleNewsLatestElement.css";


function ArticleNewsLatestElement(props) {

  const flexStyle = {
    flexDirection : "row-reverse"
  }

  return (
    <a href={props.url} target="_blank" alt="" className="ArticleNewsLink">
    <div className="ArticleNewsLatestElementFlex" style={props.right ? flexStyle : null} >
    <div className="ArticleImgDiv">
        <img src={props.img} alt="Latest Article" loading="lazy" className="ArticleNewsLatestImg"></img>
      </div>
      <div className="ArticleNewsLatestElementFlex2">
        <div className="ArticleNewsLatestElementTitle">{props.title}</div>
        <div className="ArticleNewsLatestElementInfo">
          <div className="LatestInfoGradient"></div>
          {props.info}
        </div>
        <div className="ArticleNewsLatestElementBy">~{props.by}</div>
      </div>
    </div>
    </a>
  );
}

export default ArticleNewsLatestElement;
