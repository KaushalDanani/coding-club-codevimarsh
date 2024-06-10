import React, { useEffect, useState } from "react";
import "./ArticleNewsLatestDiv.css";
import ArticleNewsLatestElement from "./ArticleNewsLatestElement.js";
import ArticlesNewsMore from "./ArticlesNewsMore.js";
import ArticleContentInfo from "./ArticleContentInfo.js";
import NewsContentInfo from "./NewsContentInfo.js";
// import downArrow from "../images/down_arrow.png"
// import upArrow from "../images/up_arrow.png"

function ArticleNewsLatestDiv(props) {
  const [news, setNews] = useState([]);

  // useEffect(() => {
  //   // console.log(props.news+"😡😡😡😡😡😡")
  //   if(props.news != null)
  //     setNews(props.news)
  // }, [props.news])

  useEffect(() => {
    if(props.news != null && props.articles != null)
    {
      props.isArticleSelected == false ? 
      setNews(props.news) : setNews(props.articles)
    }
  }, [props.isArticleSelected,props.news,props.articles]);

  var type = props.isArticleSelected ? "Articles" : "News";

  const [more, setMore] = useState(false);
  const [imgSrc, setImgSrc] = useState("down");
  function showMore() {
    setMore(!more);
    setImgSrc(more ? "down" : "up");

  }

  return (
    <div className="ArticleNewsLatestDiv">
      <div className="LatestHeading">Latest {type}</div>
      {news[0] ? (
        <ArticleNewsLatestElement
          title={news[0].title}
          info={news[0].content}
          by={news[0].author}
          url={news[0].url}
          img={news[0].urlToImage}
        />
      ) : null}
      {news[1] ? (
        <ArticleNewsLatestElement
          title={news[1].title}
          info={news[1].content}
          by={news[1].author}
          url={news[1].url}
          img={news[1].urlToImage}
          right="true"
        />
      ) : null}
      <div className="LatestHeading" style={{"margin-top":"40px"}}>More {type}</div>
      {news.length != 0 ? (
        <ArticlesNewsMore
          more={more}
          isArticleSelected={props.isArticleSelected}
          news={news}
        />
      ) : null}
      <div className="showMoreDiv">
        <button className="showMoreBtn" id="showBtn" onClick={showMore}>
          {!more ? (
            <svg
              id="showImg"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chevron-up"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default ArticleNewsLatestDiv;
