import React, { useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom'
import '../SubjectResources/AddObjectForm.css'
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
        try{
            const image = e.target.files[0];
            const reader = new FileReader();

            reader.onload = function (event) {
                let base64String = event.target.result;

                base64String = base64String.replace(/^data:image\/\w+;base64,/, '');

                setLogo(base64String);
            };

            if (image) {
                reader.readAsDataURL(image);
            } else {
                setToastVisible(true);
                setToastMessage("No file selected");
                setToastType("warning");
                setTimeout(() => 
                {
                    setToastVisible(false)
                }, 1800);
            }
        }
        catch(err)
        {
            console.error("ADD IMAGE ERROR: "+err)
        }
    }


    function addMyBook(e) {

        e.preventDefault();
        const bname = bookName();
        const blink = bookLink();
        const bauthor = bookAuthor();
        const bedition = bookEdition();
        const sub_id = searchParams.get('sub_id');

        fetch(`${process.env.REACT_APP_BACKEND_URL}/resources/book/add`, {
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
                <div className='ObjectBackBtn'></div>
            </Link>
            <div className="addObjectContainer">
                <div className="addObjectHeader">
                    <h1>Add Book</h1>
                </div>
                <form className="addObjectBody" onSubmit={addMyBook}>

                        <div className="addObjectRow">
                            <div>Title</div>
                            <div>:</div>
                            <input type="text" name="tital_text" id="book_title_text" required></input>
                        </div>


                        <div className="addObjectRow">
                            <div>Link</div>
                            <div>:</div>
                            <input type="text" name="tital_text" id="book_link_text" required></input>
                        </div>


                        <div className="addObjectRow">
                            <div>Author</div>
                            <div>:</div>
                            <input type="text" name="tital_text" id="book_author_text" required></input>
                        </div>


                        <div className="addObjectRow">
                            <div>Edition</div>
                            <div>:</div>
                            <input type="text" name="tital_text" id="book_edition_text" required></input>
                        </div>


                        <div className="addObjectRow">
                            <div>Thumbnail</div>
                            <div>:</div>
                            <input className="fileInput" type="file" name="bookThumbnail" id="book_img_text" onChange={(e) => { logoMaker(e) }} required></input>
                        </div>


                        <div className='addObjectBtn'>
                            <button onClick={clearBookData}> Clear </button>

                            <button type="submit">Add Book</button>
                        </div>

                </form>
            </div>
        </>
    );
}








