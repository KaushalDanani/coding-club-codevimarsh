import { useEffect, useState } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
import "./RecentHeading.css"
import ArticlesNewsLoginPage from './ArticleNewsLoginPage.js';

function NewUpdates(props) {

  const [news,setNews]=useState([]);

  useEffect( () => {

    if(props.news != null)
      setNews(props.news)

  }, [props.news])

  // useEffect( () => {

  //   if(props.news != null)
  //     setNews(props.news)

  // }, [props.news])

  return (
    <div>

      <div className='recentHeading'>
        <h1>{`Checkout Latest ${props.title}`}</h1>
          <Link to={`/article&news/`}>
            <button className='recentHeadingButton'>View More</button>
          </Link>
      </div>
        
        {/* <RecentUpdatesPanel/> */}
        {news.length!==0 ? 
        <ArticlesNewsLoginPage news={news}/>
        :null}
    </div>
  )
}

export default NewUpdates