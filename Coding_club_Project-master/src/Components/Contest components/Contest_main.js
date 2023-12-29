import React, { useEffect, useState } from "react";
import './Contest_main.css';
import Weekly_contest from "./Weekly_contest";
import Running_contest from "./Running_contest";
import Completed_contest from "./Completed_contest";
import Navbar_after_login from "../kaushal/Navbar_after_login";
import MyfooterAfterLogin from "../MyfooterAfterLogin";

export default function Contest_main() {

    const [pastcontestinfo, setPastContestinfo] = useState([{}]);
    useEffect(() => {
        fetch("/contest/past").then(
            response => response.json()
        ).then(
            data => {
                setPastContestinfo(data)
            }
        )
    }, []);

    const [currentcontestinfo, setCurrentContestinfo] = useState([{}]);
    useEffect(() => {
        fetch("/contest/current").then(
            response => response.json()
        ).then(
            data => {
                setCurrentContestinfo(data)
            }
        )
    }, []);

    const [upcomingcontestinfo, setUpcomingContestinfo] = useState([{}]);
    useEffect(() => {
        fetch("/contest/upcoming").then(
            response => response.json()
        ).then(
            data => {
                setUpcomingContestinfo(data)
            }
        )
    }, []);




    return (

        <>
        <div className="contest_main">
            {/* {console.log("ok")} */}
            <Navbar_after_login/>
            <div className="contest_heading"><p>Coding Contest</p></div>


            {/* {upcoming contest} */}
            <div className="upcoming_contest">
                <p>Up Coming Contest</p>
            </div>
            <div className="upcomingContestGrid">
            {upcomingcontestinfo.map(function upcomingcontest(element){
                const startdate = new Date(element.startDate);
                return(
                    <Weekly_contest
                        type = {element.type1}
                        name={element.name}
                        startdate={`${startdate.getDate()}-${startdate.getMonth() + 1}-${startdate.getFullYear()} `}
                        time={`${startdate.getHours()}:${startdate.getMinutes()} to ${startdate.getHours() + Number(element.time)}:${startdate.getMinutes()}`}
                        link={element.contestLink}
                    />
                    
                );
            })}
            </div>

            {/* {Current running contest} */}
            <div className="runnig_contest">
                <p>Running Contest</p>
            </div>
            {currentcontestinfo.map(function currentcontest(element) {
                const startdate = new Date(element.startDate);
                return (
                    <Running_contest
                        name={element.name}
                        startdate={`${startdate.getDate()}-${startdate.getMonth() + 1}-${startdate.getFullYear()} `}
                        time={`${startdate.getHours()}:${startdate.getMinutes()} to ${startdate.getHours() + Number(element.time)}:${startdate.getMinutes()}`}

                        start={element.contestLink}
                    />
                );
            })}


            {/* {past contest} */}
            <div className="past_contest">
                <p>Past Contest</p>
            </div>
            {pastcontestinfo.map(function pastcontest(element) {
                const startdate = new Date(element.startDate);
                return (
                    <Completed_contest
                        name={element.name}
                        startdate={`${startdate.getDate()}-${startdate.getMonth() + 1}-${startdate.getFullYear()} `}
                        time={`${startdate.getHours()}:${startdate.getMinutes()} to ${startdate.getHours() + Number(element.time)}:${startdate.getMinutes()}`}

                        result={element.resultLink}
                        solution={element.solutionLink} >
                    </Completed_contest>
                );
            })}



        </div>
        <MyfooterAfterLogin/>
        </>
    );
}