import React, {useState} from "react";
import { useLocation } from "react-router-dom";
import "./ArticlesNewsHomePage.css"
import ArticleNewsLatestDiv from './ArticleNewsLatestDiv.js';
import ArticleNewsTopBanner from './ArticleNewsTopBanner.js';
import Navbar_after_login from "../NavbarAfterLogin/Navbar_after_login.js";
import Myfooter from "../Footer/Myfooter.js";

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
    <Navbar_after_login/>
    <div className="background-color-ArticlesNews">
      
      <ArticleNewsTopBanner onChange={onToggle} />
      <ArticleNewsLatestDiv isArticleSelected={isArticleSelected} />
    </div>
    <Myfooter />
    </>
  );
}

export default ArticlesNewsHomePage;
