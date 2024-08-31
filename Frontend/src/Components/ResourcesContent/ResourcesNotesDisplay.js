import React from 'react'
import ResourcesNotesElement from "./ResourcesNotesElement.js"
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
        id = {NoteElement.title+NoteElement.link}
        deleteNote = {props.deleteNote}
        link = {NoteElement.link}
        />
    }
  
    return (

    <div className='ResourcesNotesDisplay' style={notesLen!=0 ? bgStyle : null}>
        {props.notes ? props.notes.map(addNotes) : null}        
    </div>
  )
}

export default React.memo(ResourcesNotesDisplay);