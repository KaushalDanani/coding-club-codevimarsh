import React from 'react'
import "./ResourcesBookElement.css"

function ResourcesBookElement(props) {

  const base64Img = `data:image/png;base64,${props.thumbnail}`;

  return (
    <div className="BookElement">
      <button id='resElemDelt' className='off' onClick={()=>{ props.deleteBook(props.id)}}/>
      <a href={props.link} target='_blank'>
        <div className="BookImageDiv">
          <img src={base64Img} alt="" />
        </div>
        <div className="BookElementTitle">{props.title}</div>
        <div className="BookElementInfo">
          <div className="BookInfoGradient"></div>
          {props.edition}
        </div>
        <div className="BookElementBy">~{props.author}</div>
      </a>
    </div>
  )
}

export default ResourcesBookElement