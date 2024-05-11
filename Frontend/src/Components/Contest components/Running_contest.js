import React from "react";
import './Running_contest.css';

export default function Running_contest(props){
    return(
        <div className="running_contest_main">
            <div className="contest_flex">
            <div className="runnig_contest_name"><p>{props.name}</p></div>
            <a href={props.start} target="_blank">
            <div className="contest_start_btn">
            <button>Start</button></div>
            </a>
            </div>
            <div className="running_date_time">
                <p>Date : {props.startdate}</p>
                <p>Time : {props.time}</p>
            </div>
        </div>
    );
}