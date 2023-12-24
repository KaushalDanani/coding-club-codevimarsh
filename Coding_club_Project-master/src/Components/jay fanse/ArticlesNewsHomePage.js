import React, {useState} from "react";
import ArticleNewsLatestDiv from './ArticleNewsLatestDiv';
import ArticleNewsTopBanner from './ArticleNewsTopBanner';
import "./ArticlesNewsHomePage.css"
import Navbar_after_login from "../kaushal/Navbar_after_login";
import { useLocation } from "react-router-dom";
import MyfooterAfterLogin from "../MyfooterAfterLogin";

function ArticlesNewsHomePage() {
  const location = useLocation();

const searchParams = new URLSearchParams(location.search);
  const userID = searchParams.get('userID');


    const [isArticleSelected, setArticleSelected] = useState(true);

    function onToggle(isArticle) {
    setArticleSelected(isArticle);
  }

  return (
    <>
    <Navbar_after_login userID={userID}/>
    <div className="background-color-ArticlesNews">
      
      <ArticleNewsTopBanner onChange={onToggle} />
      <ArticleNewsLatestDiv isArticleSelected={isArticleSelected} />
    </div>
    <MyfooterAfterLogin/>
    </>
  );
}

export default ArticlesNewsHomePage;
