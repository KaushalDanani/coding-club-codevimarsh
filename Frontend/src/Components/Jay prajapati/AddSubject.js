import React, { useEffect, useState } from "react";
import { Navigate, useSearchParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom'
import './AddSubject.css';
import Navbar_after_login from "../kaushal/Navbar_after_login.js";
import ToastComponent from "../jay fanse/toastComponent.js";

export default function AddSubject() {
    const navigate = useNavigate();
    const [toastVisible,setToastVisible] = useState(false);
    const [toastMessage,setToastMessage] = useState("");
    const [toastType,setToastType] = useState("");

    const [logo,setLogo] = useState("");

    function subName(){
        const name = document.getElementById("title_text").value;

        if(name == "") {
            setToastVisible(true);
            setToastMessage("Please fill details of subject!");
            setToastType("warning");
            setTimeout(() => setToastVisible(false), 4000);
        }
        else if(logo == "") {
            setToastVisible(true);
            setToastMessage("Please select logo for subject!");
            setToastType("warning");
            setTimeout(() => setToastVisible(false), 4000);
        }
        else
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

    function clearData() {
        document.getElementById("title_text").value = "";
        document.getElementById("img_text").value = null;
        setLogo("");
    }

    return (
        <>
            {toastVisible ? <ToastComponent message={toastMessage} type={toastType} /> : null}
            {/* <Navbar_after_login /> */}
            <Link to={'/resources'}>
                <div className='contestBackBtn'></div>
            </Link>
            <div className="addSubjectContainer">
                <div className="addSubjectHeader">
                    <h1>Add Subject</h1>
                </div>
                {/* <hr style={{ height: '2.5px', width: '100%', backgroundColor: 'white', margin: '0px' }} /> */}
                <div className="addSubjectBody">
                    

                        {/* <div className="q_tital">
                            <label htmlFor="tital_text">Subject :</label>
                            <p></p>
                            <input type="text" name="tital_text" id="title_text"></input>
                        </div> */}

                        <div className="addSubjectRow">
                            <div>Subject</div>
                            <div>:</div>
                            <input style={{'padding': '3px 10px'}} type="text" name="tital_text" id="title_text"></input>
                        </div>
                        
                        {/* <div className="q_code">
                            <label htmlFor="code_text">Subject Logo :</label>
                            <p></p>
                            <input className="fileInput" type="file" name="code_text" id="img_text" onChange={(e) => { logoMaker(e) }}  cols="" rows="2"></input>
                        </div> */}

                        <div className="addSubjectRow">
                            <div>Subject Logo</div>
                            <div>:</div>
                            <input className="fileInput" type="file" name="code_text" id="img_text" onChange={(e) => { logoMaker(e) }}  cols="" rows="2"></input>
                        </div>


                        <div className='addSubjectBtn'>
                            {/* <Link to={'/resources'}> <button id='pc_cancelbtn' className='addProjectCollabrationBtn'> Cancel </button> </Link> */}

                            <button onClick={clearData}> Clear </button>
                            <button onClick={subName}> Add </button>
                        </div>

                    
                </div>
            </div>
        </>
    );
}








