import React, { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom'
import './AddSubject.css';
import Navbar_after_login from "../kaushal/Navbar_after_login.js";

export default function AddSubject() {

    const [logo,setLogo] = useState("");

    function subName(){
        const name = document.getElementById("title_text").value;

        addMySubject(name);
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
    
    

   
    function addMySubject(name) {

        fetch("/addmysubject", {
            method: 'POST',
            body: JSON.stringify({
                "subject": name,
                "sublogo": logo,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    return (
        <>
            <Navbar_after_login />
            <div className="addSubjectContainer">
                <div className="addSubjectHeader">
                    <h1><p className="subject">Add Subject</p></h1>
                </div>
                <hr style={{ height: '2.5px', width: '100%', backgroundColor: 'white', margin: '0px' }} />
                <div className="formDiv">
                    <form className="" id="Subject_main">

                        <div className="q_tital">
                            <label htmlFor="tital_text">Subject :</label>
                            <p></p>
                            <input type="text" name="tital_text" id="title_text"></input>
                        </div>
                        
                        <div className="q_code">
                            <label htmlFor="code_text">Subject Logo :</label>
                            <p></p>
                            <input className="fileInput" type="file" name="code_text" id="img_text" onChange={(e) => { logoMaker(e) }}  cols="" rows="2"></input>
                        </div>


                        <div className='buttonSection'>
                            <Link to={'/resources'}> <button id='pc_cancelbtn' className='addProjectCollabrationBtn'> Cancel </button> </Link>

                            <Link to={'/resources'}><input type="button" value={"Submit"} onClick={subName} className="q_submit" /></Link>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}








