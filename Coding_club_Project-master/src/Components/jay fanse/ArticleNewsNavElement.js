import React, { useState } from 'react'
import "./ArticleNewsNavElement.css"

function ArticleNewsNavElement(props) {

    const dotStyle = {
        
        width: "100%"
    }

    const ElementStyle = {
        color : "white",
    }
    
    const dotSelectedStyle = {
        
        width: "100%",
        backgroundColor : "white"
    }


    const [isHover,setHover] = useState(false);
    var isSelected = true;
    isSelected = props.select;

    function highlight(){
        setHover(true);
    }

    function dishighlight(){
        setHover(false);
    }

    

  return (
    <div className='ArticleNewsNavElement' onMouseOver={highlight} onMouseLeave={dishighlight}>
        <div className="ElementName" style={isSelected ? ElementStyle : null}>{props.name}</div>
        <div className="underline">
            <div 
            style={isSelected ? dotSelectedStyle : isHover ? dotStyle : null } 
            className='dot'></div>
        </div>
    </div>
  )
}

export default ArticleNewsNavElement