import React from "react";
import './Weekly_contest.css';

export default function Weekly_contest(props){

    return(
        <div className="weekly_main">
           

            <div className="main_upcoming_container">
                <div className="contest_flex">
                <div className="upcoming_contest_name"><p>{props.name}</p></div>
                    <div className="contest_start_btn">
                        <a href={props.start} target="_blank"><button>CkeckOut</button></a>
                    </div>
                </div>
                <div className="upcoming_date_time">
                    <p>Type : {props.type}</p>
                    <p>Date : {props.startdate} {props.startdate == props.enddate ? '' : `to ${props.enddate}`}</p>
                    <p>Time : {props.time}</p>
                </div>
            </div>
          
        </div>
    );
}