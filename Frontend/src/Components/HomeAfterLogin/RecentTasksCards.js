import React from "react";
import "../Contest/Weekly_contest.css"

function RecentTasksCards(props) {
  var color1 = [
    "rgb(126, 10, 10)",
    "rgb(11, 11, 168)",
    "rgb(1, 93, 1)",
    "rgb(113, 113, 3)",
    "rgb(73, 0, 168)",
    "rgb(201, 80, 0)",
  ];
  var color2 = [
    "red",
    "rgb(82, 82, 254)",
    "rgb(103, 229, 81)",
    "rgb(169, 169, 2)",
    "rgb(140, 57, 212)",
    "rgb(255, 169, 72)",
  ];

  const colorStyles = {
    backgroundImage: "",
  };

  function colorSelect() {
    // var n =  Math.floor(Math.random()*6);
    // colorStyles.backgroundImage="linear-gradient("+color1[n]+","+color2[n]+")";
  }
  colorSelect();
  return (
    <>
      <div className="weekly_main">
      <a href={props.contests.link} target='_blank'>
        <div className="main_upcoming_container">
          <div className="contest_flex">
            <div className="upcoming_contest_name">
              <p>{props.contests.name}</p>
            </div>
            <div className="contest_start_btn">
              <a href={props.contests.link} target="_blank">
                <button>CkeckOut</button>
              </a>
            </div>
          </div>
          <div className="upcoming_date_time">
            <p>Type : {props.contests.type}</p>
            <p>
              Date : {props.contests.startdate}
              {props.contests.startdate == props.contests.enddate
                ? ""
                : ` to ${props.contests.enddate}`}
            </p>
            <p>Time : {props.contests.time}</p>
          </div>
        </div>
      </a>
      </div>
    </>
  );
}

export default RecentTasksCards;
