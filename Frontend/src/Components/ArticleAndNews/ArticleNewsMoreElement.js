import React from 'react'
import "./ArticleNewsMoreElement.css"
// import icon from "../images/ArticleBanner.jpg"

function ArticleNewsMoreElement(props) {
  return (
      <a href={props.url} target='_blank'>
    <div className="ArticleNewsMoreElement">
        <div className="ArticleMoreImageDiv">
        <img src={props.img} alt="Article" loading="lazy"/>
        </div>
        <div className="ArticleNewsMoreElementTitle">{props.title}</div>
        <div className="ArticleNewsMoreElementInfo">
          <div className="MoreInfoGradient"></div>
          {props.info}
        </div>
        <div className="ArticleNewsMoreElementBy">~{props.by}</div>
    </div>
    </a>
  )
}

export default ArticleNewsMoreElement