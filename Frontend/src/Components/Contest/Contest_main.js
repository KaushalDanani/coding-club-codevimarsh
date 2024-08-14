import React, { useEffect, useState } from "react";
import './Contest_main.css';
import Weekly_contest from "./Weekly_contest.js";
import Running_contest from "./Running_contest.js";
import Completed_contest from "./Completed_contest.js";
import Navbar_after_login from "../NavbarAfterLogin/Navbar_after_login.js";
import MyfooterAfterLogin from "../FooterAfterLogin/MyfooterAfterLogin.js";
import { Link } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader.js";
import useUser from "../../store/userContext.js";

export default function Contest_main() {

    const [pastcontestinfo, setPastContestinfo] = useState([{}]);
   
    const { user, setUser } = useUser();
    const [isAdmin,setAdmin] = useState('');
    const [currentcontestinfo, setCurrentContestinfo] = useState([{}]);
    const [upcomingcontestinfo, setUpcomingContestinfo] = useState([{}]);
    const [isLoading, setIsLoading] = useState(false)
    const [userData,setUserData] = useState('');
    const [base64Img,setBase64Img] = useState('');

    useEffect(() => {

        if(user!=null) {
            setAdmin(user.isAdmin);
            setBase64Img(`data:image/png;base64,${user.profileImg}`);
        }
    },[user])

    useEffect(() => {

        (async () => {
            setIsLoading(true);

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/contest/past`)
            const data = await response.json();
            setPastContestinfo(data)

            const response1 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/contest/current`)
            const data1 = await response1.json();
            setCurrentContestinfo(data1)

            const response2 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/contest/upcoming`)
            const data2 = await response2.json();
            setUpcomingContestinfo(data2)

            // const response3 = await fetch('${process.env.REACT_APP_BACKEND_URL}/user/profileImg')
            // const data3 = await response3.json();
            // setUserData(data3.data);
            // setBase64Img(`data:image/png;base64,${data3.data.profileImg}`);

            setIsLoading(false);
        })();

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
            
            <Navbar_after_login imgData={base64Img} />

            <Link 
            style={isAdmin===true ? {"display":"block"} : {"display":"none"}}
            className="AddContestBtn" to={`/addContest`}>Add Contest</Link>
            {/* {upcoming contest} */}
            {upcomingcontestinfo.length !== 0 ? 
            <>
                <div className="upcoming_contest">
                    <p>Up Coming Contest</p>
                </div>
                <div className="upcomingContestGrid">
                {upcomingcontestinfo.map(function upcomingcontest(element){
                    const startdate = new Date(element.startDate);
                    const endDate = new Date(element.endDate);
                    return(
                        <Weekly_contest
                            key={element._id}
                            type={element.type}
                            name={element.name}
                            startdate={`${startdate.getDate().toString().padStart(2,'0')}-${(startdate.getMonth() + 1).toString().padStart(2,'0')}-${startdate.getFullYear().toString().padStart(2,'0')} `}
                            enddate={`${endDate.getDate().toString().padStart(2,'0')}-${(endDate.getMonth() + 1).toString().padStart(2,'0')}-${endDate.getFullYear().toString().padStart(2,'0')} `}
                            time={`${startdate.getHours().toString().padStart(2,'0')}:${startdate.getMinutes().toString().padStart(2,'0')} to ${endDate.getHours().toString().padStart(2,'0')}:${endDate.getMinutes().toString().padStart(2,'0')}`}
                            link={element.contestLink}
                        />
                        
                    );
                })}
                </div>
            </>
            : null }

            {/* {Current running contest} */}
            {currentcontestinfo.length !== 0 ? 
            <>
                <div className="runnig_contest">
                    <p>Running Contest</p>
                </div>
                <div className="RunningContestGrid">
                    {currentcontestinfo.map(function currentcontest(element) {
                        const startdate = new Date(element.startDate);
                        const endDate = new Date(element.endDate);
                        return (
                            <Running_contest
                                key={element._id}
                                type={element.type}
                                name={element.name}
                                startdate={`${startdate.getDate().toString().padStart(2,'0')}-${(startdate.getMonth() + 1).toString().padStart(2,'0')}-${startdate.getFullYear().toString().padStart(2,'0')} `}
                                enddate={`${endDate.getDate().toString().padStart(2,'0')}-${(endDate.getMonth() + 1).toString().padStart(2,'0')}-${endDate.getFullYear().toString().padStart(2,'0')} `}
                                time={`${startdate.getHours().toString().padStart(2,'0')}:${startdate.getMinutes().toString().padStart(2,'0')} to ${endDate.getHours().toString().padStart(2,'0')}:${endDate.getMinutes().toString().padStart(2,'0')}`}

                                start={element.contestLink}
                            />
                        );
                    })}
                </div>
            </>
            : null }


            {/* {past contest} */}
            {pastcontestinfo.length !== 0 ? 
            <>
                <div className="past_contest">
                    <p>Past Contest</p>
                </div>
                <div className="PastContestGrid">
                    {pastcontestinfo.map(function pastcontest(element) {
                        const startdate = new Date(element.startDate);
                        const endDate = new Date(element.endDate);
                        return (
                            <Completed_contest
                                key={element._id}
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
            </>
            : 
            <>
                <div className="past_contest">
                    <p>Past Contest</p>
                </div>
                <div className="discussionNullContent">
                    <img src="/images/profileProjects.png" alt="No Data" loading="lazy"></img>
                    <div className="nullContentInfo">No contest history available :)</div>
                </div>
            </>
            }
        </div>
        <MyfooterAfterLogin/>
        </>
    );
}