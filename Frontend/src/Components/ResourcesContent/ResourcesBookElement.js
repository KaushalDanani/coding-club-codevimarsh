import React from 'react'
import "./ResourcesBookElement.css"

function ResourcesBookElement(props) {

  const base64Img = `data:image/png;base64,${props.thumbnail}`;

  return (
    <div className="BookElement">
      <img src={base64Img} alt="Book"  loading="lazy"/>
      <button id='resElemDelt' className='off' onClick={()=>{ props.deleteBook(props.id)}}/>
      <div className='bookDetails'>
        <a href={props.link} target='_blank'>
          {/* <div className="BookImageDiv">
            <img src={base64Img} alt="Book" loading="lazy" />
          </div> */}
          <div className="BookElementTitle">{props.title}</div>
          <div className="BookElementInfo">
            {/* <div className="BookInfoGradient"></div> */}
            <div>{props.edition}</div>
            <div style={{fontWeight: "500"}}>by {props.author}</div>
          </div>
      </a>
      </div>
    </div>
  )
}

export default ResourcesBookElement