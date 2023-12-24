import React from 'react'
import "./ArticleNewsLoginPage.css"
import ArticleNewsMoreElement from './ArticleNewsMoreElement'
import ArticleContentInfo from './ArticleContentInfo'
import NewsContentInfo from './NewsContentInfo';

function ArticlesNewsLoginPage(props) {

  var toModifyArray = props.isArticleSelected ? [...ArticleContentInfo] : [...NewsContentInfo];
  const ContentInfoReverse = toModifyArray.reverse();
  var MoreContentInfo = ContentInfoReverse.slice(2,5);

  var moreNews = (props.news.slice(0,3));

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