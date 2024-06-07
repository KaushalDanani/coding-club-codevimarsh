import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import './Ask_Question.css';
import useUser from "../../store/userContext.js";
import ToastComponent from "../Toast/toastComponent.js";


export default function Ask_Question() {

    const [Tital, setTital] = useState("");
    const [Tags, setTags] = useState([]);
    const [Description, setDescription] = useState("");
    const [Code, setCode] = useState("");

    const [toastVisible,setToastVisible] = useState(false);
    const [toastMessage,setToastMessage] = useState("");
    const [toastType,setToastType] = useState("");

    const { user, setUser } = useUser();
    const userID = user._id;

    const navigate = useNavigate();

    function addTital() {
        const tital = document.getElementById("tital_text").value;
        setTital(tital);
        
    }

    function addTags() {
        const tags = document.getElementById("tegs_text").value;
        setTags(tags.split(","));
        
    }

    function addDescription() {
        const description = document.getElementById("description_text").value;
        setDescription(description);
        
    }

    function addCode() {
        const code = document.getElementById("code_text").value;
        setCode(code);
        
    }

    function addMyQuestion() {
        fetch("/addmyquestion", {
            method: 'POST',
            body: JSON.stringify({
                "questiontital": Tital,
                "questiontags": Tags,
                "questiondescription": Description,
                "questioncode": Code,
                "questionasker": userID,
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
                    navigate("/discussion");
                }, 1000);
            });
        
    }




    return (
        <>
            {toastVisible ? <ToastComponent message={toastMessage} type={toastType} /> : null}

            <Link to={'/discussion'}>
                <div className='discussionBackBtn'></div>
            </Link>
            <div className="askQuestionContainer">
                <div className="askQuestionHeader">
                    <h1><p className="question">Ask Your Question</p></h1>
                </div>
                <hr style={{ height: '2.5px', width: '100%', backgroundColor: 'white', margin: '0px' }} />
                <div className="formDiv">
                    <form className="" id="question_main">

                        <div className="q_tital">
                            <label htmlFor="tital_text">Question :</label>
                            <p></p>
                            <textarea name="tital_text" id="tital_text" onChange={addTital} cols="" rows=""></textarea>
                        </div>
                        <div className="q_tegs">
                            <label htmlFor="tegs_text">Tags :</label>
                            <p></p>
                            <textarea name="tegs_text" id="tegs_text" onChange={addTags} cols="" rows=""></textarea>
                        </div>
                        <div className="q_desc">
                            <label htmlFor="Description_text">Description :</label>
                            <p></p>
                            <textarea name="Description_text" id="description_text" onChange={addDescription} cols="" rows="2"></textarea>
                        </div>
                        <div className="q_code">
                            <label htmlFor="code_text">Code :</label>
                            <p></p>
                            <textarea name="code_text" id="code_text" onChange={addCode} cols="" rows="2"></textarea>
                        </div>


                        <div className='buttonSection'>
                            <Link to={'/discussion'}> <button className='addFormButton'> Cancel </button> </Link>

                            <Link><button onClick={addMyQuestion} className="addFormButton">Submit</button></Link>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}
