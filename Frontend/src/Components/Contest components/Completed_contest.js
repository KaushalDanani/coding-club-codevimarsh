import React from "react";
import './Completed_contest.css';

export default function Completed_contest(props){


    return(
        <div className="completed_contest_main">
            <div className="main_container">
            <div className="completed_contest_flex">
                <div className="completed_contest_name"><p>{props.name}</p></div>
                <div className="completed_contest_btn">
                    <a href={props.result} target="_blank"><button>Result</button></a>
                    <a href={props.solution} target="_blank"><button>Solution</button></a>
                </div>
            </div>
            <div className="completed_date_time">
                <p>Type : {props.type}</p>
                <p>Date : {props.startdate} {props.startdate === props.enddate ? '' : `to ${props.enddate}`}</p>
                <p>Time : {props.time}</p>
            </div>
            </div>
        </div>
    );
}