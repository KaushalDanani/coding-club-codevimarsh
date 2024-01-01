import React, { useEffect, useState } from "react";
import { useLocation} from 'react-router-dom';
// import { useLocation } from 'react-router-dom'
import './Give_answer.css';
import useUser from "../../store/userContext";

export function reply_close(){
    const closebtn = document.getElementById("reply_main");
    // console.log(closebtn);
    closebtn.style.display = "none";
}

export function reply_open(){
    const closebtn = document.getElementById("reply_main");
    // console.log(closebtn);
    closebtn.style.display = "block";
}

function Give_answer() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [Reply , setReply] = useState("");
    const [Code , setCode] = useState("");
    // const userID = sessionStorage.getItem('userID')
    const {user,setUser} = useUser();
    const userID = user._id;
    const q_id = searchParams.get("q_id");

    function addReply(){
        const reply = document.getElementById("reply_text").value;
        setReply(reply);
        // console.log(description);
    }

    function addCode(){
        const code = document.getElementById("code_text").value;
        setCode(code);
        // console.log(code);
    }

    function addMyReply(){
        fetch("/addmyreply",{
            method: 'POST',
            body: JSON.stringify({
                "answerreply" : Reply,
                "answercode" : Code,
                "answerqid" : q_id,
                "answerreplier" : userID,
            }),
            headers: {
              'Content-Type': 'application/json'
                }
            })
            reply_close();
    }
    

    return ( 
        <form action="/" className="reply_main" id="reply_main">


            <div className="r_close" onClick={reply_close}>
                <img src="/images/close_image.webp"></img>
            </div>


            <div className="answer_header">
                <p className="reply">Give Your Answer</p>
            </div>


            <div className="answer_info">
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

                {/* <input type="button" value={"Submit"} onClick={addMyReply} className="r_submit"/> */}

                <div className="reply_btn">
                    <div className="close_btn" onClick={reply_close}>
                        Cancle
                    </div>
                    <div className="submit_btn" onClick={addMyReply}>
                        Submit
                    </div>
                </div>

            </div>
        </form>
     );
}

export default Give_answer;