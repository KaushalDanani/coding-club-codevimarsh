import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import '../SubjectResources/AddObjectForm.css'
import useUser from "../../store/userContext.js";
import ToastComponent from "../Toast/toastComponent.js";


export default function Ask_Question(props) {

    const [Question, setQuestion] = useState("");
    const [Tags, setTags] = useState([]);
    const [Description, setDescription] = useState("");
    const [Code, setCode] = useState("");

    const [toastVisible,setToastVisible] = useState(false);
    const [toastMessage,setToastMessage] = useState("");
    const [toastType,setToastType] = useState("");

    const [userID, setUserID] = useState();

    useEffect(() => {
        if(props.user)
            setUserID(props.user._id);
    },[props.user])

    const navigate = useNavigate();

    function addQuestion() {
        const question = document.getElementById("question_text").value;
        setQuestion(question);
    }

    function addTags() {
        const tags = document.getElementById("tegs_text").value;
        setTags(tags.split(",").map(tag => tag.trim()));
    }

    function addDescription() {
        const description = document.getElementById("description_text").value;
        setDescription(description);
    }

    function addCode() {
        const code = document.getElementById("code_text").value;
        setCode(code);
    }

    function clearAskQuestionData() {
        document.getElementById("question_text").value = "";
        setQuestion("");
    
        document.getElementById("tegs_text").value = "";
        setTags("");

        document.getElementById("description_text").value = "";
        setDescription("");
    
        document.getElementById("code_text").value = "";
        setCode("");
    }

    function addMyQuestion(e) {

        e.preventDefault();
        fetch("/addmyquestion", {
            method: 'POST',
            body: JSON.stringify({
                "questiontital": Question,
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
                <div className='ObjectBackBtn'></div>
            </Link>
            <div className="addObjectContainer">
                <div className="addObjectHeader">
                    <h1>Ask Your Question</h1>
                </div>
                <form className="addObjectBody" onSubmit={addMyQuestion}>
                    {/* <form className="" id="question_main"> */}

                        {/* <div className="q_tital">
                            <label htmlFor="tital_text">Question :</label>
                            <p></p>
                            <textarea name="tital_text" id="tital_text" onChange={addQuestion} cols="" rows=""></textarea>
                        </div> */}
                        <div className="addObjectRow">
                            <div>Question</div>
                            <div>:</div>
                            <textarea name="tital_text" id="question_text" onChange={addQuestion} cols="" rows="2" required></textarea>
                        </div>

                        {/* <div className="q_tegs">
                            <label htmlFor="tegs_text">Tags :</label>
                            <p></p>
                            <textarea name="tegs_text" id="tegs_text" onChange={addTags} cols="" rows=""></textarea>
                        </div> */}
                        <div className="addObjectRow">
                            <div>Tags</div>
                            <div>:</div>
                            <input onChange={addTags} placeholder="Related technologies (separated by ',')" type="text" name="tegs_text" id="tegs_text" required></input>
                        </div>

                        {/* <div className="q_desc">
                            <label htmlFor="Description_text">Description :</label>
                            <p></p>
                            <textarea name="Description_text" id="description_text" onChange={addDescription} cols="" rows="2"></textarea>
                        </div> */}
                        <div className="addObjectRow">
                            <div>Description</div>
                            <div>:</div>
                            <textarea name="Description_text" id="description_text" onChange={addDescription} cols="" rows="3" required></textarea>
                        </div>

                        {/* <div className="q_code">
                            <label htmlFor="code_text">Code :</label>
                            <p></p>
                            <textarea name="code_text" id="code_text" onChange={addCode} cols="" rows="2"></textarea>
                        </div> */}
                        <div className="addObjectRow">
                            <div>Code</div>
                            <div>:</div>
                            <textarea name="code_text" id="code_text" onChange={addCode} cols="" rows="4" required></textarea>
                        </div>

                        <div className='addObjectBtn'>
                            <button onClick={clearAskQuestionData}>Clear</button>
                            <button type="submit">Add Question</button>
                        </div>

                    {/* </form> */}
                </form>
            </div>
        </>
    );
}
