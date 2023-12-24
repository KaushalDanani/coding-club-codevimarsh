import React, { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import './Ask_Question.css';

function question_close(){
    const closebtn = document.getElementById("question_main");
    closebtn.style.display = "none";
}

export function question_open(){
    const closebtn = document.getElementById("question_main");
    // console.log(closebtn);
    closebtn.style.display = "block";
}

export default function Ask_Question(){

    const [Tital ,setTital] = useState("");
    const [Tags , setTags] = useState([]);
    const [Description , setDescription] = useState("");
    const [Code , setCode] = useState("");

    const userID = sessionStorage.getItem('userID')

    function addTital(){
        const tital = document.getElementById("tital_text").value;
        setTital(tital);
        // console.log(tital);
    }

    function addTags(){
        const tags = document.getElementById("tegs_text").value;
        setTags(tags.split(","));
        // console.log(tags.split(","));
    }

    function addDescription(){
        const description = document.getElementById("description_text").value;
        setDescription(description);
        // console.log(description);
    }

    function addCode(){
        const code = document.getElementById("code_text").value;
        setCode(code);
        // console.log(code);
    }

    function addMyQuestion(){
        fetch("/addmyquestion",{
            method: 'POST',
            body: JSON.stringify({
                "questiontital" : Tital,
                "questiontags" : Tags,
                "questiondescription" : Description,
                "questioncode" : Code,
                "questionasker" : userID,
            }),
            headers: {
              'Content-Type': 'application/json'
                }
            })
            question_close();
    }



    
    return(
        <form className="question_main" id="question_main">
            {/* <div className="q_close" onClick={question_close}>
                <img src="/images/close_image.webp"></img>
            </div> */}

            <div className="question_header">
                <p className="question">Ask Your Question</p>
            </div>

            <div className="question_info">
                <div className="q_tital">
                    <label htmlFor="tital_text">Question :</label>
                    <p></p>
                    <textarea name="tital_text" id="tital_text" onChange={addTital} cols="" rows=""></textarea>
                </div>
                <div className="q_tegs">
                    <label htmlFor="tegs_text">Tegs :</label>
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

                {/* <input type="button" value={"Submit"} onClick={addMyQuestion} className="q_submit"/> */}

                <div className="question_btn">
                    <div className="que_btn" onClick={question_close}>
                        Cancle
                    </div>
                    <div className="que_btn" onClick={addMyQuestion}>
                        Submit
                    </div>
                </div>
            </div>


        </form>
    ); 
}
