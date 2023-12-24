import React from 'react'
import "./ArticlesNewsMore.css"
import ArticleNewsMoreElement from './ArticleNewsMoreElement'
import ArticleContentInfo from './ArticleContentInfo'
import NewsContentInfo from './NewsContentInfo';

function ArticlesNewsMore(props) {

  var toModifyArray = props.isArticleSelected ? [...ArticleContentInfo] : [...NewsContentInfo];
  const ContentInfoReverse = toModifyArray.reverse();
  var MoreContentInfo = ContentInfoReverse.slice(2,5);

  var moreNews = (props.news.slice(2,5));
  if(props.more === true)
  {
    moreNews = (props.news).slice(2,);
  }

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
    <div className='ArticleNewsMore'>
        {moreNews.map(AddContent)}

    </div>
  )
}

export default ArticlesNewsMore