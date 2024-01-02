import React, { useEffect, useState } from 'react'
import "./ArticleNewsLoginPage.css"
import ArticleNewsMoreElement from './ArticleNewsMoreElement.js'
import ArticleContentInfo from './ArticleContentInfo.js'
import NewsContentInfo from './NewsContentInfo.js';

function ArticlesNewsLoginPage(props) {

  var toModifyArray = props.isArticleSelected ? [...ArticleContentInfo] : [...NewsContentInfo];
  const ContentInfoReverse = toModifyArray.reverse();
  var MoreContentInfo = ContentInfoReverse.slice(2,5);

  const [moreNews,setMoreNews] = useState([]);

  useEffect( ()=>{
    if(props.news!=null)
    {
      setMoreNews(props.news.slice(0,3));
    }
  },[props.news])

  // const moreNews = (props.news.slice(0,3));

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
        {console.log('more news ',moreNews)}
        {moreNews.map(AddContent)}

    </div>
  )
}

export default ArticlesNewsLoginPage