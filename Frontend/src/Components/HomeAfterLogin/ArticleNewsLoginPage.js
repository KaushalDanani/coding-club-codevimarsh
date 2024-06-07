import React, { useEffect, useState } from 'react'
import "./ArticleNewsLoginPage.css"
import ArticleNewsMoreElement from '../ArticleAndNews/ArticleNewsMoreElement.js'
import ArticleContentInfo from '../ArticleAndNews/ArticleContentInfo.js'
import NewsContentInfo from '../ArticleAndNews/NewsContentInfo.js';

function ArticlesNewsLoginPage(props) {

  var toModifyArray = props.isArticleSelected ? [...ArticleContentInfo] : [...NewsContentInfo];
  const ContentInfoReverse = toModifyArray.reverse();
  var MoreContentInfo = ContentInfoReverse.slice(2,5);

  const [moreNews,setMoreNews] = useState([]);

  useEffect( ()=>{
    if(props.news!=null)
    {
      setMoreNews(props.news.slice(0,4));
    }
  },[props.news])


  function AddContent(ContentItem){
    
    return <ArticleNewsMoreElement 
      title = {ContentItem.title}
      info = {ContentItem.content}
      by = {ContentItem.author}
      url={ContentItem.url}
      img={ContentItem.urlToImage}
    />
  }

  return (
    <div className='ArticleNewsLoginPage'>
        {moreNews.map(AddContent)}

    </div>
  )
}

export default ArticlesNewsLoginPage