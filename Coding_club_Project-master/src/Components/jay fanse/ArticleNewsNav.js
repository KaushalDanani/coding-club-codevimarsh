import React, { useState } from 'react'
import "./ArticleNewsNav.css";
import ArticleNewsNavElement from './ArticleNewsNavElement.js';

function ArticleNewsNav(props) {
  
  const [isSelected,setSelected] = useState(true)
  
  function selectArticles(){
    setSelected(true);
    props.onChange(true);
  }

  function selectNews(){
    setSelected(false);
    props.onChange(false);
  }
  
  return (
    <div>
        <ul className='ArticleNewsNav'>
            <li onClick={selectArticles}>
              <ArticleNewsNavElement name="ARTICLES" select={isSelected}/>
            </li>
            <li onClick={selectNews}>
              <ArticleNewsNavElement name="NEWS" select = {!isSelected}/>
            </li>
        </ul>
    </div>
  )
}

export default ArticleNewsNav