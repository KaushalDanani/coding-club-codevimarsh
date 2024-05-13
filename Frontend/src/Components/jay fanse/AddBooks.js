import React, { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './AddBooks.css';
import Navbar_after_login from "../kaushal/Navbar_after_login.js";
import ToastComponent from "./toastComponent.js";

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

    // async function getBookName() {
    //     try {
    //         const response = await fetch(`/bookName?sub_id=${sub_id}`,{
    //             headers: {
    //                 'Content-type': 'application/json',
    //               },
    //         });
    //         const data = await response.json();
    //         setSubj(data);
    //         console.log(data);
    //     } catch (error) {
    //         console.error('Error fetching Book name:', error);
    //     }
    // }

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
        }, 3000);
        });
    }
    return (
        <>
            {toastVisible ? <ToastComponent message={toastMessage} type={toastType} /> : null}
            <Navbar_after_login />
            <div className="addBookContainer">
                <div className="addBookHeader">
                    <h1><p className="Book">Add Book</p></h1>
                </div>
                <hr style={{ height: '2.5px', width: '100%', backgroundColor: 'white', margin: '0px' }} />
                <div className="formDiv">
                    <form className="" id="Book_main">

                        <div className="q_tital">
                            <label htmlFor="tital_text">Title :</label>
                            <p></p>
                            <input type="text" name="tital_text" id="book_title_text"></input>
                        </div>

                        <div className="q_tital">
                            <label htmlFor="tital_text">Link :</label>
                            <p></p>
                            <input type="text" name="tital_text" id="book_link_text"></input>
                        </div>

                        <div className="q_tital">
                            <label htmlFor="tital_text">Author :</label>
                            <p></p>
                            <input type="text" name="tital_text" id="book_author_text"></input>
                        </div>

                        <div className="q_tital">
                            <label htmlFor="tital_text">Edition :</label>
                            <p></p>
                            <input type="text" name="tital_text" id="book_edition_text"></input>
                        </div>

                        <div className="q_code">
                            <label htmlFor="code_text">Thumbnail :</label>
                            <p></p>
                            <input type="file" name="code_text" id="img_text" onChange={(e) => { logoMaker(e) }} cols="" rows="2"></input>
                        </div>


                        <div className='buttonSection'>
                            <Link to={'/resources'}> <button className='addFormButton'> Cancel </button> </Link>

                            <Link><button onClick={addMyBook} className="addFormButton">Submit</button></Link>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}








