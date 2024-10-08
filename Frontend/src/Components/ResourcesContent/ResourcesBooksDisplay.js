import React, { useState } from 'react'
import "./ResourcesBooksDisplay.css"
import ResourcesBookElement from './ResourcesBookElement.js'

function ResourcesBooksDisplay(props) {

  const booksLen = props.books.length;
  const bgStyle = {
    backgroundImage : "none",
    height : "fit-content"
  }

    function addBooks(BookElement){
        return <ResourcesBookElement 
        thumbnail = {BookElement.thumbnail}
        title = {BookElement.title}
        edition = {BookElement.edition}
        author = {BookElement.author}
        id = {BookElement.title+BookElement.author+BookElement.edition}
        deleteBook = {props.deleteBook}
        link = {BookElement.link}
        />
    }

  return (
    <div className='ResourcesBooksDisplay' style={booksLen!=0 ? bgStyle : null}>
        {props.books.map(addBooks)}
        
    </div>
  )
}

export default ResourcesBooksDisplay