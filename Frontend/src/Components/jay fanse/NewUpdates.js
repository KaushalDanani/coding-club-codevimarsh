import { useEffect, useState } from 'react'
import React from 'react'
import RecentHeading from './RecentHeading.js'
import RecentUpdatesPanel from './RecentUpdatesPanel.js'
import ArticlesNewsMore from './ArticlesNewsMore.js';
import ArticlesNewsLoginPage from './ArticleNewsLoginPage.js';

function NewUpdates(props) {

  const [news,setNews]=useState([]);

  useEffect( () => {

    (async () => {
      props.title=="News" ? 

    await fetch("https://newsapi.org/v2/everything?q=apple&from=2023-12-31&to=2023-12-31&sortBy=popularity&apiKey=876ed1ab1a2545c18ffdb151c871e344")
      .then(response => response.json())
      .then(
          (quote) => {
            console.log('QUOTE : ',quote);
            setNews(quote.articles);
            console.log('News : ',quote.articles);
      })
      :
      await fetch("https://newsapi.org/v2/top-headlines?country=in&category=science&apiKey=876ed1ab1a2545c18ffdb151c871e344")
      .then(response => response.json())
      .then(
          (quote) => {
            // console.log(quote);
            setNews(quote.articles);
            console.log(quote.articles);
      })
    })()
  }, [props.title])

  return (
    <div>
        <RecentHeading heading={`Checkout Latest ${props.title}`} 
        link={`/article&news/`}
        isArticleSelected={props.isArticleSelected}
        />
        
        {/* <RecentUpdatesPanel/> */}
        {news.length!=0 ? 
        <ArticlesNewsLoginPage news={news}/>
        :null}
    </div>
  )
}

export default NewUpdates