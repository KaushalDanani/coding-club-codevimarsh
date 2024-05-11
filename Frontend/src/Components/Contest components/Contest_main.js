import React, { useEffect, useState } from "react";
import './Contest_main.css';
import Weekly_contest from "./Weekly_contest.js";
import Running_contest from "./Running_contest.js";
import Completed_contest from "./Completed_contest.js";
import Navbar_after_login from "../kaushal/Navbar_after_login.js";
import MyfooterAfterLogin from "../MyfooterAfterLogin.js";
import { Link } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader.js";
import useUser from "../../store/userContext.js";
// import { set } from "mongoose";

export default function Contest_main(props) {

    const [pastcontestinfo, setPastContestinfo] = useState([{}]);
    // const {user,setUser} = useUser();
    // const userID = user._id;
    // const isAdmin = user.isAdmin;
    const [isAdmin,setAdmin] = useState('');
    const [currentcontestinfo, setCurrentContestinfo] = useState([{}]);
    const [upcomingcontestinfo, setUpcomingContestinfo] = useState([{}]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        if(props.user!=null)
        setAdmin(props.user.isAdmin);
    },[props.user])

    useEffect(() => {

        setIsLoading(true);
        (async () => {

            const response = await fetch("/contest/past")
            const data = await response.json();
            setPastContestinfo(data)

            const response1 = await fetch("/contest/current")
            const data1 = await response1.json();
            setCurrentContestinfo(data1)

            const response2 = await fetch("/contest/upcoming")
            const data2 = await response2.json();
            setUpcomingContestinfo(data2)

        })();
        setIsLoading(false);

    }, []);


    if (isLoading)
        return <>
            <div className='loadingPage'>
            <HashLoader
                color={'#ffffff'}
                loading={isLoading}
                // cssOverride={override}
                size={70}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            </div>
        </>
    
    return (

        <>
        <div className="contest_main">
            {/* {// console.log("ok")} */}
            <Navbar_after_login/>

            {/* {upcoming contest} */}
            <div className="upcoming_contest">
                <p>Up Coming Contest</p>
                <Link 
                style={isAdmin===true ? {"display":"block"} : {"display":"none"}}
                className="AddContestBtn" to={`/addContest`}>Add Contest</Link>

            </div>
            <div className="upcomingContestGrid">
            {upcomingcontestinfo.map(function upcomingcontest(element){
                const startdate = new Date(element.startDate);
                const endDate = new Date(element.endDate);
                return(
                    <Weekly_contest
                        type = {element.type}
                        name={element.name}
                        startdate={`${startdate.getDate().toString().padStart(2,'0')}-${(startdate.getMonth() + 1).toString().padStart(2,'0')}-${startdate.getFullYear().toString().padStart(2,'0')} `}
                        enddate={`${endDate.getDate().toString().padStart(2,'0')}-${(endDate.getMonth() + 1).toString().padStart(2,'0')}-${endDate.getFullYear().toString().padStart(2,'0')} `}
                        time={`${startdate.getHours().toString().padStart(2,'0')}:${startdate.getMinutes().toString().padStart(2,'0')} to ${endDate.getHours().toString().padStart(2,'0')}:${endDate.getMinutes().toString().padStart(2,'0')}`}
                        link={element.contestLink}
                    />
                    
                );
            })}
            </div>

            {/* {Current running contest} */}
            <div className="runnig_contest">
                <p>Running Contest</p>
            </div>
            <div className="RunningContestGrid">
                {currentcontestinfo.map(function currentcontest(element) {
                    const startdate = new Date(element.startDate);
                    const endDate = new Date(element.endDate);
                    return (
                        <Running_contest
                            type = {element.type}
                            name={element.name}
                            startdate={`${startdate.getDate().toString().padStart(2,'0')}-${(startdate.getMonth() + 1).toString().padStart(2,'0')}-${startdate.getFullYear().toString().padStart(2,'0')} `}
                            enddate={`${endDate.getDate().toString().padStart(2,'0')}-${(endDate.getMonth() + 1).toString().padStart(2,'0')}-${endDate.getFullYear().toString().padStart(2,'0')} `}
                            time={`${startdate.getHours().toString().padStart(2,'0')}:${startdate.getMinutes().toString().padStart(2,'0')} to ${endDate.getHours().toString().padStart(2,'0')}:${endDate.getMinutes().toString().padStart(2,'0')}`}

                            start={element.contestLink}
                        />
                    );
                })}
            </div>


            {/* {past contest} */}
            <div className="past_contest">
                <p>Past Contest</p>
            </div>
            <div className="PastContestGrid">
                {pastcontestinfo.map(function pastcontest(element) {
                    const startdate = new Date(element.startDate);
                    const endDate = new Date(element.endDate);
                    return (
                        <Completed_contest
                            type = {element.type}
                            name={element.name}
                            startdate={`${startdate.getDate().toString().padStart(2,'0')}-${(startdate.getMonth() + 1).toString().padStart(2,'0')}-${startdate.getFullYear().toString().padStart(2,'0')} `}
                            enddate={`${endDate.getDate().toString().padStart(2,'0')}-${(endDate.getMonth() + 1).toString().padStart(2,'0')}-${endDate.getFullYear().toString().padStart(2,'0')} `}
                            time={`${startdate.getHours().toString().padStart(2,'0')}:${startdate.getMinutes().toString().padStart(2,'0')} to ${endDate.getHours().toString().padStart(2,'0')}:${endDate.getMinutes().toString().padStart(2,'0')}`}

                            result={element.resultLink}
                            solution={element.solutionLink} >
                        </Completed_contest>
                    );
                })}
            </div>

        </div>
        <MyfooterAfterLogin/>
        </>
    );
}