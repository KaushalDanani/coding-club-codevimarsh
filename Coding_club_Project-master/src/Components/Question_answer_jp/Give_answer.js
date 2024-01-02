import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
// import { useLocation } from 'react-router-dom'
import './Give_answer.css';
import useUser from "../../store/userContext.js";

// export function reply_close() {
//     const closebtn = document.getElementById("reply_main");
//     // console.log(closebtn);
//     closebtn.style.display = "none";
// }

// export function reply_open() {
//     const closebtn = document.getElementById("reply_main");
//     // console.log(closebtn);
//     closebtn.style.display = "block";
// }

function Give_answer() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [Reply, setReply] = useState("");
    const [Code, setCode] = useState("");
    const {user,setUser} = useUser();
    const userID = user._id;
    const q_id = searchParams.get("q_id");

    function addReply() {
        const reply = document.getElementById("reply_text").value;
        setReply(reply);
        // console.log(description);
    }

    function addCode() {
        const code = document.getElementById("code_text").value;
        setCode(code);
        // console.log(code);
    }

    function addMyReply() {
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
        // reply_close();
    }


    return (
        <>
        <Link to={`/discussion/question/?q_id=${q_id}`}>
        <div className='replyBackBtn'></div>
        </Link>
        <div className="addReplyContainer">
            <div className="addReplyHeader">
                <h1><p className="reply">Add Your Reply</p></h1>
            </div>
            <hr style={{ height: '2.5px', width: '100%', backgroundColor: 'white', margin: '0px' }} />
            <div className="formDivRep">
            
                <form action="/" className="reply_main" id="reply_main">
                    
                    <div className="r_reply">
                        <label htmlFor="reply_text">Reply :</label>
                        <p></p>
                        <textarea name="reply_text" id="reply_text" onChange={addReply} cols="" rows="2"></textarea>
                    </div>
                    <div className="r_code">
                        <label htmlFor="code_text">Code :</label>
                        <p></p>
                        <textarea name="code_text" id="code_text" onChange={addCode} cols="" rows="2"></textarea>
                    </div>

                    <div className="buttonSection">
                    <Link to={`/discussion/question/?q_id=${q_id}`}> <button className='addFormButton'> Cancel </button> </Link>
                        
                        <Link to={`/discussion/question/?q_id=${q_id}`}><button onClick={addMyReply} className="addFormButton">Submit</button></Link>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}

export default Give_answer;