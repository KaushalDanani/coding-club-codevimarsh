import React from 'react'
import "./ResourcesNotesElement.css"

function ResourcesNotesElement(props) {
  return (

    <a href={props.link} target='_blank' className='NoteA'>
    <div className="NoteElement">
        <div className="NoteElementTitle">{props.title}</div>
    </div>
    </a>
  )
}

export default ResourcesNotesElement