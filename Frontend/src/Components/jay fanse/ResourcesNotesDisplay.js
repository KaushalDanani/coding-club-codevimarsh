import React from 'react'
import ResourcesNotesElement from "./ResourcesNotesElement.js"
import ResourcesNotesInfo from "./ResourcesNotesInfo.js"
import "./ResourcesNotesDisplay.css"

function ResourcesNotesDisplay(props) {
  
    const notesLen = props.notes.length;
    const bgStyle = {
        backgroundImage : "none",
        height : "fit-content"
    }

    function addNotes(NoteElement){
        return <ResourcesNotesElement 
        title = {NoteElement.title}
        link = {NoteElement.link}
        />
    }
  
    return (

    <div className='ResourcesNotesDisplay' style={notesLen!=0 ? bgStyle : null}>
        {props.notes ? props.notes.map(addNotes) : null}
        
    </div>
  )
}

export default ResourcesNotesDisplay