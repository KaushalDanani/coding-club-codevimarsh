import React from 'react'
import "./ResourcesNotesElement.css"

function ResourcesNotesElement(props) {
  return (
    <div className='NoteA'>
    <div className="NoteElement">
        <a className="NoteElementTitle" target='_blank' href={props.link}>{props.title}</a>
        <button id='resElemDelt' className='off' onClick={()=>{props.deleteNote(props.id)}}/>
    </div>
    </div>
  )
}

export default React.memo(ResourcesNotesElement);