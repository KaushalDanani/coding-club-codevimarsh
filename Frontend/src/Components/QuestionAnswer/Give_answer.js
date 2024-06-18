import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Give_answer.css';
import '../SubjectResources/AddObjectForm.css'
import useUser from "../../store/userContext.js";
import ToastComponent from "../Toast/toastComponent.js";

function Give_answer(props) {

    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [Reply, setReply] = useState("");
    const [Code, setCode] = useState("");
    const q_id = searchParams.get("q_id");

    const [userID, setUserID] = useState();

    useEffect(() => {
        if(props.user)
            setUserID(props.user._id);
    },[props.user])

    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");

    function addReply() {
        const reply = document.getElementById("reply_text").value;
        setReply(reply);
    }

    function addCode() {
        const code = document.getElementById("code_text").value;
        setCode(code);
    }

    function clearReplyData() {
        document.getElementById("reply_text").value = "";
        setReply("");

        document.getElementById("code_text").value = "";
        setCode("");
    }

    function addMyReply(e) {

        e.preventDefault();
        fetch("/addmyreply", {
            method: 'POST',
            body: JSON.stringify({
                "answerreply": Reply,
                "answercode": Code,
                "answerqid": q_id,
                "answerreplier": userID,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setToastVisible(true);
                setToastMessage("Reply added successfully!");
                setToastType("success");
                setTimeout(() => {
                    setToastVisible(false)
                    navigate(`/discussion/question/?q_id=${q_id}`);
                }, 1000);
            });
        
    }


    return (
        <>
            {toastVisible ? <ToastComponent message={toastMessage} type={toastType} /> : null}

            <Link to={`/discussion/question/?q_id=${q_id}`}>
                <div className='ObjectBackBtn'></div>
            </Link>
            <div className="addObjectContainer">
                <div className="addObjectHeader">
                    <h1>Add Your Reply</h1>
                </div>
                <form className="addObjectBody" onSubmit={addMyReply}>

                        {/* <div className="r_reply">
                            <label htmlFor="reply_text">Reply :</label>
                            <p></p>
                            <textarea name="reply_text" id="reply_text" onChange={addReply} cols="" rows="2"></textarea>
                        </div> */}
                        <div style={{'gridTemplateColumns': '2.7fr 1fr 20fr'}} className="addObjectRow replyRow">
                            <div>Reply</div>
                            <div>:</div>
                            <textarea name="reply_text" id="reply_text" onChange={addReply} cols="" rows="4" required></textarea>
                        </div>

                        {/* <div className="r_code">
                            <label htmlFor="code_text">Code :</label>
                            <p></p>
                            <textarea name="code_text" id="code_text" onChange={addCode} cols="" rows="2"></textarea>
                        </div> */}
                        <div style={{'gridTemplateColumns': '2.7fr 1fr 20fr'}} className="addObjectRow replyRow">
                            <div>Code</div>
                            <div>:</div>
                            <textarea name="code_text" id="code_text" onChange={addCode} cols="" rows="5" required></textarea>
                        </div>

                        <div className="addObjectBtn">
                            <button onClick={clearReplyData}> Clear </button>
                            <button type="submit">Add Reply</button>
                        </div>
                </form>
            </div>
        </>
    );
}

export default Give_answer;