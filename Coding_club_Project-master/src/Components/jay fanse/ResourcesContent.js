import React, { useContext, useState, useEffect } from 'react';
import "./ResourcesContent.css";
import ResourcesBooksDisplay from './ResourcesBooksDisplay';
import ResourcesVideosDisplay from './ResourcesVideosDisplay';
import ResourcesNotesDisplay from './ResourcesNotesDisplay';
import Navbar_after_login from '../kaushal/Navbar_after_login';
// import { DataContext } from '../Jay prajapati/DataContext';
import { useLocation } from 'react-router-dom';

function ResourcesContent() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
  const userID = searchParams.get('userID');

    const subjectRes = location.state.resources[0];

    // const { filteredData } = useContext(DataContext);

    const books = subjectRes.books;
    const notes = subjectRes.notes;
    const videos = subjectRes.videos;

    function changeType(active) {
        document.getElementById("books").checked = false;
        document.getElementById("videos").checked = false;
        document.getElementById("notes").checked = false;
        document.getElementById(active).checked = true;
        console.log(active);
    }

    return (
        <>
            <Navbar_after_login userID={userID}/>
            <div className="ResourcesContentFrame">
                <div className="ResourcesContentTopic">Get all your requirements at just one click!</div>
                <div className="ResourcesContentMain">
                    <input type="radio" name="slider" id="books" onClick={() => {
                        changeType("books");
                    }} />
                    <input type="radio" name="slider" id="videos" onClick={() => {
                        changeType("videos");
                    }} />
                    <input type="radio" name="slider" id="notes" onClick={() => {
                        changeType("notes");
                    }} />
                    <div className="ResourcesContentList">
                        <label htmlFor="books" className="books">
                            <span>Books</span>
                        </label>
                        <label htmlFor="videos" className="videos">
                            <span>Videos</span>
                        </label>
                        <label htmlFor="notes" className="notes">
                            <span>Notes</span>
                        </label>
                        <div className="slider"></div>
                    </div>
                    <div className="text-content">
                        <div className="books text">
                            <div className="title">Books</div>
                            <ResourcesBooksDisplay
                                books={books}
                            />
                        </div>
                        <div className="videos text">
                            <div className="title">Videos</div>
                            <ResourcesVideosDisplay
                                videos={videos}
                            />
                        </div>
                        <div className="notes text">
                            <div className="title">Notes</div>
                            <ResourcesNotesDisplay
                                notes={notes}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResourcesContent;
