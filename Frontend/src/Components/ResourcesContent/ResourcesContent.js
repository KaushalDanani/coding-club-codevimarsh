import React, { useContext, useState, useEffect } from 'react';
import "./ResourcesContent.css";
import ResourcesBooksDisplay from './ResourcesBooksDisplay.js';
import ResourcesVideosDisplay from './ResourcesVideosDisplay.js';
import ResourcesNotesDisplay from './ResourcesNotesDisplay.js';
import Navbar_after_login from '../NavbarAfterLogin/Navbar_after_login.js';
import { Link,useNavigate , useLocation } from 'react-router-dom';
import useUser from '../../store/userContext.js';
import ToastComponent from '../Toast/toastComponent.js';
import MyFooterAfterLogin from '../FooterAfterLogin/MyfooterAfterLogin.js'

function ResourcesContent(props) {
    const navigate = useNavigate();
    
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");
    
    const [admin,setAdmin] = useState(false);
    
    useEffect( ()=>{
        if(props.user)
        {
            setAdmin(props.user.isAdmin);
        }
    },[props.user])

    
    function adminCheck(){
        return (admin === true)
    }
    
    function EditElemOption(){
        let comps = document.querySelectorAll('#resElemDelt');
        for (const c of comps) {
            if (c.classList.contains('off'))
            c.classList.remove('off');
            else
            c.classList.add('off');
        }
    }
    
    const location = useLocation();
    const [subjectRes,setSubjectRes] = useState(location.state.resources[0]);
    const [imgData, setImgData] = useState(location.state.imgData);
    
    const sub_id = subjectRes._id;
    const subject = subjectRes.subject;
    const [books,SetBooks] = useState([]);
    const [notes,SetNotes] = useState([]);
    const [videos,SetVideos] = useState([]);
    useEffect(()=>{
        SetBooks(subjectRes.books);
        SetNotes(subjectRes.notes);
        SetVideos(subjectRes.videos);
    },[subjectRes])

    function changeType(active) {
        document.getElementById("books").checked = false;
        document.getElementById("videos").checked = false;
        document.getElementById("notes").checked = false;
        document.getElementById(active).checked = true;
    }

    function deleteBook(id){
        const conf = window.confirm("Are you sure you want to remove this book??");
        if(conf){
            const updatedbooks = books.filter(book => (book.title + book.author + book.edition) !== id);
            SetBooks(updatedbooks);
            
            fetch(`/resources/book/delete/${sub_id}`,{
                method: 'POST',
                headers:{
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify({updatedbooks})
            })
            .then(response=>response.json())
            .then((data)=>{
                setToastVisible(true);
                setToastType("warning");
                setToastMessage("Book Deleted....!!");
                setTimeout(() => {
                    setToastVisible(false)
                    navigate('/resources');
                }, 1000);
            })
            .catch(err => {
                console.error("Error deleting the book..!");
            })
        }
    }

    function deleteVideo(id){
        const conf = window.confirm("Are you sure you want to remove this video??");
        if(conf){
            const updatedvideos = videos.filter(video => (video.title + video.channel) !== id);
            SetVideos(updatedvideos);
            
            fetch(`/resources/video/delete/${sub_id}`,{
                method: 'POST',
                headers:{
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify({updatedvideos})
            })
            .then(response=>response.json())
            .then((data)=>{
                setToastVisible(true);
                setToastType("warning");
                setToastMessage("Video Deleted....!!");
                setTimeout(() => {
                    setToastVisible(false)
                    navigate('/resources');
                }, 1000);
            })
            .catch(err => {
                console.error("Error deleting the video..!");
            })
        }
    }

    function deleteNote(id){
        const conf = window.confirm("Are you sure you want to remove this note??");
        if(conf){
            const updatednotes = notes.filter(note => (note.title + note.link) !== id);
            SetNotes(updatednotes);
            
            fetch(`/resources/note/delete/${sub_id}`,{
                method: 'POST',
                headers:{
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify({updatednotes})
            })
            .then(response=>response.json())
            .then((data)=>{
                setToastVisible(true);
                setToastType("warning");
                setToastMessage("Note Deleted....!!");
                setTimeout(() => {
                    setToastVisible(false)
                    navigate('/resources');
                }, 1000);
            })
            .catch(err => {
                console.error("Error deleting the note..!");
            })
        }
    }


    return (
        <>
            {toastVisible ? <ToastComponent message={toastMessage} type={toastType} /> : null}
            <Navbar_after_login imgData = {imgData}/>
            <div className="ResourcesContentFrame">
                <div className="ResourcesContentTopic">Resources for {subject}</div>
                <div className="ResourcesContentMain">
                    <input type="radio" name="slider" id="books" onClick={() => {
                        changeType("books");
                    }} defaultChecked/>
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
                            <div className="title">Books
                                <div className='addRes' style={{display: adminCheck()?'block':'none'}}>
                                    <button className='addResBut' onClick={EditElemOption}>Edit</button>
                                    <Link to={`/resources/rescontent/addBook?sub_id=${sub_id}`}><button className='addResBut'>Add Books</button></Link>
                                </div>
                            </div>
                            <ResourcesBooksDisplay
                                books={books}
                                deleteBook = {deleteBook}
                            />
                        </div>
                        <div className="videos text">
                            <div className="title">Videos
                                <div className='addRes' style={{ display: adminCheck() ? 'block' : 'none' }}>
                                <button className='addResBut' onClick={EditElemOption}>Edit</button>
                                    <Link to={`/resources/rescontent/addVideo?sub_id=${sub_id}`}><button className='addResBut'>Add Videos</button></Link>
                                </div>
                            </div>
                            <ResourcesVideosDisplay
                                videos={videos}
                                deleteVideo = {deleteVideo}
                            />
                        </div>
                        <div className="notes text">
                            <div className="title">Notes
                                <div className='addRes' style={{ display: adminCheck() ? 'block' : 'none' }}>
                                <button className='addResBut' onClick={EditElemOption}>Edit</button>
                                    <Link to={`/resources/rescontent/addNote?sub_id=${sub_id}`}><button className='addResBut'>Add Notes</button></Link>
                                </div>
                            </div>
                            <ResourcesNotesDisplay
                                notes={notes}
                                deleteNote = {deleteNote}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <MyFooterAfterLogin />
        </>
    );
}

export default ResourcesContent;
