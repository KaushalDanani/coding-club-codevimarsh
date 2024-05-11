import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import "./AddContest.css"
import { toast } from "react-toastify";

function AddContest() {

    const navigate = useNavigate();

    const [cName,setCName]=useState("");
    const [cType,setCType]=useState("");
    const [startDate,setStartDate] = useState("");
    const [startTime,setStartTime] = useState("");
    const [endDate,setEndDate] = useState("");
    const [endTime,setEndTime] = useState("");
    const [contestLink,setContestLink] = useState("");
    const [resultLink,setResultLink] = useState("");
    const [solutionLink,setSolutionLink] = useState("");

    const nameChangeHandler = (e) => {
        setCName(e.target.value);
    }
    const typeChangeHandler = (e) => {
        setCType(e.target.value);
    }
    const sDateChangeHandler = (e) => {
        setStartDate(e.target.value);
    }
    const sTimeChangeHandler = (e) => {
        setStartTime(e.target.value);
    }
    const eDateChangeHandler = (e) => {
        setEndDate(e.target.value);
    }
    const eTimeChangeHandler = (e) => {
        setEndTime(e.target.value);
    }
    const cLinkChangeHandler = (e) => {
        setContestLink(e.target.value);
    }
    const rLinkChangeHandler = (e) => {
        setResultLink(e.target.value);
    }
    const sLinkChangeHandler = (e) => {
        setSolutionLink(e.target.value);
    }

    function clearHandler(){
        setCName("");
        setCType("");
        setStartDate("");
        setStartTime("");
        setEndDate("");
        setEndTime("");
        setContestLink("");
        setResultLink("");
        setSolutionLink("");
    }

    function registerContest(){

        if(cName!=="" && cType!=="" && startDate!=="" && startTime!=="" && endDate!=="" && endTime!=="" && contestLink!=="" && resultLink!=="")
        {
            if(startDate>endDate || (startDate==endDate && startTime>endTime))
            {
                alert("End Date can't be before Start Date");
            }
            else
            {

                const contestData = {
                    name : cName,
                    type : cType,
                    startDate : startDate,
                    startTime : startTime,
                    endDate : endDate,
                    endTime : endTime,
                    cLink : contestLink,
                    rLink : resultLink,
                    sLink : solutionLink,
                }

                fetch("/registerContest/",{
                    method : "POST",
                    body : JSON.stringify(contestData),
                    headers : {
                    "Content-Type" : "application/json"  
                    } 
                })
                .then(response => response.json())
                .then(data => {
                    navigate('/contest');
                    alert(data.message);
                });
            }
        }
        else
        {
            alert("Please fill all required details!");
        }
    }

  return (
    <>
        <Link to={'/contest'}>
        <div className='contestBackBtn'></div>
        </Link>
        <div className='addContestDiv'>
        <div className='addContestHeader'>Contest Registration</div>
        <div className='addContestBody'>
            <div className="addContestRow">
                <div>Contest Name</div>
                <div>:</div>
                <input type='text' required value={cName} onChange={nameChangeHandler}/>
            </div>
            <div className="addContestRow">
                <div>Contest Type</div>
                <div>:</div>
                <select onChange={typeChangeHandler} value={cType}>
                    <option value="">&lt; select Type &gt;</option>
                    <option value="Daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                </select>
            </div>
            <div className="addContestRow">
                <div>Start Date</div>
                <div>:</div>
                <div className='addContestDateRow'>
                <input type='date' value={startDate} onChange={sDateChangeHandler} required></input>
                <div style={{'display':'flex','justifyContent' : 'center'}}>At</div>
                <input type='time' value={startTime} onChange={sTimeChangeHandler} required></input>
                </div>
            </div>
            <div className="addContestRow">
                <div>End Date</div>
                <div>:</div>
                <div className='addContestDateRow'>
                <input type='date' value={endDate} onChange={eDateChangeHandler} required></input>
                <div style={{'display':'flex','justifyContent' : 'center'}}>At</div>
                <input type='time' value={endTime} onChange={eTimeChangeHandler} required></input>
                </div>
            </div>
            <div className="addContestRow">
                <div>Contest Link</div>
                <div>:</div>
                <input type='text'  value={contestLink} onChange={cLinkChangeHandler} required></input>
            </div> 
            <div className="addContestRow">
                <div>Result Link</div>
                <div>:</div>
                <input type='text' value={resultLink} onChange={rLinkChangeHandler} required></input>
            </div> 
            <div className="addContestRow">
                <div>solution Link (optional)</div>
                <div>:</div>
                <input type='text' value={solutionLink} onChange={sLinkChangeHandler}></input>
            </div>
            <div className='addContestBtn'>
                <button onClick={clearHandler}>Clear</button>
                <button onClick={registerContest}>Submit</button>
            </div>

        </div>
        </div>
    </>
  )
}

export default AddContest