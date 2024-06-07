import React, { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './AddBooks.css';
import Navbar_after_login from "../NavbarAfterLogin/Navbar_after_login.js";
import ToastComponent from "../Toast/toastComponent.js";

export default function AddBooks() {

    const navigate = useNavigate();
    const [toastVisible,setToastVisible] = useState(false);
    const [toastMessage,setToastMessage] = useState("");
    const [toastType,setToastType] = useState("");

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const sub_id = searchParams.get('sub_id');

    const [subj, setSubj] = useState({});

    const [logo, setLogo] = useState("");

    function bookName() {
        const name = document.getElementById("book_title_text").value;
        return name;
    }

    function bookLink() {
        const link = document.getElementById("book_link_text").value;
        return link;
    }

    function bookAuthor() {
        const authorName = document.getElementById("book_author_text").value;
        return authorName;
    }

    function bookEdition() {
        const edition = document.getElementById("book_edition_text").value;
        return edition;
    }

    function clearBookData() {
        document.getElementById("book_title_text").value = "";
        document.getElementById("book_link_text").value = "";
        document.getElementById("book_author_text").value = "";
        document.getElementById("book_edition_text").value = "";
        document.getElementById("book_img_text").value = null;
        setLogo("");
    }

    async function logoMaker(e) {
        const image = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            let base64String = event.target.result;

            base64String = base64String.replace(/^data:image\/\w+;base64,/, '');

            setLogo(base64String);
        };
        reader.readAsDataURL(image);
    }


    function addMyBook(name) {

        const bname = bookName();
        const blink = bookLink();
        const bauthor = bookAuthor();
        const bedition = bookEdition();
        const sub_id = searchParams.get('sub_id');

        fetch("/addmybook", {
            method: 'POST',
            body: JSON.stringify({
                "book": bname,
                "sub_id": sub_id,
                "link": blink,
                "author": bauthor,
                "edition": bedition,
                "thumbnail": logo,
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
        setTimeout(() => 
        {
            setToastVisible(false)
            navigate('/resources');
        }, 1500);
        });
    }
    return (
        <>
            {toastVisible ? <ToastComponent message={toastMessage} type={toastType} /> : null}
            <Link to={'/resources'}>
                <div className='contestBackBtn'></div>
            </Link>
            <div className="addBookContainer">
                <div className="addBookHeader">
                    <h1>Add Book</h1>
                </div>
                <div className="addBookBody">

                        <div className="addSubjectRow">
                            <div>Title</div>
                            <div>:</div>
                            <input style={{'padding': '3px 10px'}} type="text" name="tital_text" id="book_title_text"></input>
                        </div>


                        <div className="addSubjectRow">
                            <div>Link</div>
                            <div>:</div>
                            <input style={{'padding': '3px 10px'}} type="text" name="tital_text" id="book_link_text"></input>
                        </div>


                        <div className="addSubjectRow">
                            <div>Author</div>
                            <div>:</div>
                            <input style={{'padding': '3px 10px'}} type="text" name="tital_text" id="book_author_text"></input>
                        </div>


                        <div className="addSubjectRow">
                            <div>Edition</div>
                            <div>:</div>
                            <input style={{'padding': '3px 10px'}} type="text" name="tital_text" id="book_edition_text"></input>
                        </div>


                        <div className="addSubjectRow">
                            <div>Thumbnail</div>
                            <div>:</div>
                            <input className="fileInput" type="file" name="code_text" id="book_img_text" onChange={(e) => { logoMaker(e) }}  cols="" rows="2"></input>
                        </div>


                        <div className='addSubjectBtn'>
                            <button onClick={clearBookData}> Clear </button>

                            <button onClick={addMyBook} className="addFormButton">Submit</button>
                        </div>

                </div>
            </div>
        </>
    );
}








