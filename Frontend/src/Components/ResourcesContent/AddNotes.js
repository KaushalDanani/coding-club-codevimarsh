import React, { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './AddNotes.css';
import Navbar_after_login from "../kaushal/Navbar_after_login.js";
import ToastComponent from "../Toast/toastComponent.js";

export default function AddNotes() {

    const navigate = useNavigate();
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const sub_id = searchParams.get('sub_id');

    function noteName() {
        const name = document.getElementById("note_title_text").value;
        return name;
    }

    function noteLink() {
        const link = document.getElementById("note_link_text").value;
        return link;
    }

    async function getnoteName() {
        try {
            const response = await fetch(`/noteName?sub_id=${sub_id}`,{
                headers: {
                    'Content-type': 'application/json',
                  },
            });
            const data = await response.json();
        } catch (error) {
            console.error('Error fetching note name:', error);
        }
    }

    // function setsub(){
    //     getnoteName();
    //     return subj.note;
    // }

    function addMynote(name) {

        const nname = noteName();
        const nlink = noteLink();
        const sub_id = searchParams.get('sub_id');
        
        fetch("/addmynote", {
            method: 'POST',
            body: JSON.stringify({
                "note": nname,
                "sub_id": sub_id,
                "link": nlink,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setToastVisible(true);
                setToastMessage(data.message);
                setToastType("success");
                setTimeout(() => {
                    setToastVisible(false)
                    navigate('/resources');
                }, 1000);
            });
    }
    return (
        <>
            {toastVisible ? <ToastComponent message={toastMessage} type={toastType} /> : null}
            <Navbar_after_login />
            <div className="addNoteContainer">
                <div className="addNoteHeader">
                    <h1><p className="Note">Add note</p></h1>
                </div>
                <hr style={{ height: '2.5px', width: '100%', backgroundColor: 'white', margin: '0px' }} />
                <div className="formDiv">
                    <form className="" id="note_main">

                        <div className="q_tital">
                            <label htmlFor="tital_text">Title :</label>
                            <p></p>
                            <input type="text" name="tital_text" id="note_title_text"></input>
                        </div>

                        <div className="q_tital">
                            <label htmlFor="tital_text">Link :</label>
                            <p></p>
                            <input type="text" name="tital_text" id="note_link_text"></input>
                        </div>

                        <div className='buttonSection'>
                            <Link to={'/resources'}> <button className='addFormButton'> Cancel </button> </Link>

                            <Link><button onClick={addMynote} className="addFormButton">Submit</button></Link>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}








