import React from "react";
import './Running_contest.css';

export default function Running_contest(props){
    return(
        <div className="running_contest_main">
            <div className="main_container">
                <div className="contest_flex">
                    <div className="runnig_contest_name"><p>{props.name}</p></div>
                    <div className="contest_start_btn">
                        <a href={props.start} target="_blank"><button>Start</button></a>
                    </div>
                </div>
                <div className="running_date_time">
                    <p>Type : {props.type}</p>
                    <p>Date : {props.startdate} {props.startdate == props.enddate ? '' : `to ${props.enddate}`}</p>
                    <p>Time : {props.time}</p>
                </div>
            </div>
        </div>
    );
}