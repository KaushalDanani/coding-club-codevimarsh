import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import "./AddContest.css"
import "../SubjectResources/AddObjectForm.css"
import { toast } from "react-toastify";
import ToastComponent from '../Toast/toastComponent';

function AddContest() {

    const navigate = useNavigate();

    const [cName, setCName] = useState("");
    const [cType, setCType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [contestLink, setContestLink] = useState("");
    const [resultLink, setResultLink] = useState("");
    const [solutionLink, setSolutionLink] = useState("");

    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");

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

    function registerContest(e) {

        e.preventDefault();
        if (cName !== "" && cType !== "" && startDate !== "" && startTime !== "" && endDate !== "" && endTime !== "" && contestLink !== "" && resultLink !== "") {
            if (startDate > endDate || (startDate == endDate && startTime > endTime)) {
                // alert("End Date can't be before Start Date");
                setToastVisible(true);
                setToastMessage("End Date can't be before Start Date");
                setToastType("warning");
                setTimeout(() => setToastVisible(false), 4000);
            }
            else {

                const contestData = {
                    name: cName,
                    type: cType,
                    startDate: startDate,
                    startTime: startTime,
                    endDate: endDate,
                    endTime: endTime,
                    cLink: contestLink,
                    rLink: resultLink,
                    sLink: solutionLink,
                }

                fetch(`${process.env.REACT_APP_BACKEND_URL}/contest/registerContest/`, {
                    method: "POST",
                    body: JSON.stringify(contestData),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        // alert(data.message);
                        setToastVisible(true);
                        setToastMessage(data.message);
                        setToastType("success");
                        setTimeout(() => {
                            setToastVisible(false)
                            navigate('/contest');

                        }, 1000);
                    });
            }
        }
        else {
            
            setToastVisible(true);
            setToastMessage("Please fill all required details!");
            setToastType("warning");
            setTimeout(() => setToastVisible(false), 4000);
        }
    }

    return (
        <>
            {toastVisible ? <ToastComponent message={toastMessage} type={toastType} /> : null}
            <Link to={'/contest'}>
                <div className='ObjectBackBtn'></div>
            </Link>
            <div className='addObjectContainer'>
                <div className= 'addObjectHeader'>
                    <h1>Contest Registration</h1>
                </div>
                <form className='addContestBody' onSubmit={registerContest}>
                    <div className="addContestRow">
                        <div>Contest Name</div>
                        <div>:</div>
                        <input type='text' value={cName} onChange={nameChangeHandler} required/>
                    </div>
                    <div className="addContestRow">
                        <div>Contest Type</div>
                        <div>:</div>
                        <select onChange={typeChangeHandler} value={cType} required>
                            <option value="">&lt; Select type &gt;</option>
                            <option value="Daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                        </select>
                    </div>
                    <div className="addContestRow">
                        <div>Start Date</div>
                        <div>:</div>
                        <div className='addObjectDateRow'>
                            <input type='date' value={startDate} onChange={sDateChangeHandler} required></input>
                            <div style={{ 'display': 'flex', 'justifyContent': 'center' }}>At</div>
                            <input type='time' value={startTime} onChange={sTimeChangeHandler} required></input>
                        </div>
                    </div>
                    <div className="addContestRow">
                        <div>End Date</div>
                        <div>:</div>
                        <div className='addObjectDateRow'>
                            <input type='date' value={endDate} onChange={eDateChangeHandler} required></input>
                            <div style={{ 'display': 'flex', 'justifyContent': 'center' }}>At</div>
                            <input type='time' value={endTime} onChange={eTimeChangeHandler} required></input>
                        </div>
                    </div>
                    <div className="addContestRow">
                        <div>Contest Link</div>
                        <div>:</div>
                        <input type='text' value={contestLink} onChange={cLinkChangeHandler} required></input>
                    </div>
                    <div className="addContestRow">
                        <div>Result Link</div>
                        <div>:</div>
                        <input type='text' value={resultLink} onChange={rLinkChangeHandler} required></input>
                    </div>
                    <div className="addContestRow">
                        <div>solution Link <span style={{color: 'rgb(255, 55, 70)'}}>(Optional)</span></div>
                        <div>:</div>
                        <input type='text' value={solutionLink} onChange={sLinkChangeHandler}></input>
                    </div>
                    <div className='addObjectBtn'>
                        <button onClick={clearHandler}>Clear</button>
                        <button type='submit'>Add Contest</button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default AddContest