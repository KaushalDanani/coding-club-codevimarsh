import React, {useEffect, useState} from "react";
import ArticleNewsLatestDiv from './ArticleNewsLatestDiv.js';
import ArticleNewsTopBanner from './ArticleNewsTopBanner.js';
import Navbar_after_login from "../kaushal/Navbar_after_login.js";
import MyfooterAfterLogin from "../MyfooterAfterLogin.js";
import HashLoader from "react-spinners/HashLoader.js";
import { useLocation } from "react-router-dom";
import "./ArticlesNewsHomePage.css"

function ArticlesNewsHomePage() {

    const [isArticleSelected, setArticleSelected] = useState(true);
    const [isLoadingArticlesNewsHome, setIsLoadingArticlesNewsHome] = useState(false)
    const [newsData, setNewsData] = useState([]);
    const [articlesData, setArticlesData] = useState([])

    useEffect(() => {

      (async () => {
        
        setIsLoadingArticlesNewsHome(true);
        const response3 = await fetch("https://newsapi.org/v2/everything?q=apple&from=2023-12-31&to=2023-12-31&sortBy=popularity&apiKey=876ed1ab1a2545c18ffdb151c871e344")
        const newsDa = await response3.json();
        setNewsData(newsDa.articles);

        const response4 = await fetch("https://newsapi.org/v2/top-headlines?country=in&category=science&apiKey=876ed1ab1a2545c18ffdb151c871e344")
        const articleDa = await response4.json();
        setArticlesData(articleDa.articles);

        setIsLoadingArticlesNewsHome(false);
      })();
    },[]);

    function onToggle(isArticle) {
    setArticleSelected(isArticle);
  }

  if (isLoadingArticlesNewsHome)
    return <>
      {/* <Navbar_after_login /> */}
      <div className='loadingPage'>
        <HashLoader
            color={'#ffffff'}
            loading={isLoadingArticlesNewsHome}
            // cssOverride={override}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
      </div>
    </>

  return (
    <>
    <Navbar_after_login />
    <div className="background-color-ArticlesNews">
      
      <ArticleNewsTopBanner onChange={onToggle} />
      <ArticleNewsLatestDiv news={newsData} articles={articlesData} isArticleSelected={isArticleSelected} />
    </div>
    <MyfooterAfterLogin/>
    </>
  );
}

export default ArticlesNewsHomePage;
