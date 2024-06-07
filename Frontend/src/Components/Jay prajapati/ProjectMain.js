// import Projects from "./Projects.js"
import Filter_bar from "./Filter_bar.js"
// import { Link } from "react-router-dom"
import Navbar_after_login from "../kaushal/Navbar_after_login.js"
import ProjectDisplay from "../Innercomp/ProjectDisplay.js"
import React, { useEffect, useState } from "react";
import AddProject from "../Innercomp/AddProject.js";
import Filter_bar_Project from "./Filter_bar_Project.js"
import "./ProjectMain.css"
import MyfooterAfterLogin from "../MyfooterAfterLogin.js";
import ToastComponent from "../jay fanse/toastComponent.js";

export default function ProjectMain(props) {

    const [admin, setAdmin] = useState('');
    const [userID, setUserID] = useState('');

    const [toastVisible,setToastVisible] = useState(false);
    const [toastMessage,setToastMessage] = useState("");
    const [toastType,setToastType] = useState("");
                

    useEffect(() => {
        if (props.user != null) {
            setAdmin(props.user.isAdmin);
            setUserID(props.user._id);
        }
    }, [props.user])

    const [Projectinfo, setProjectinfo] = useState([{}]);
    useEffect(() => {
        fetch("/project").then(
            response => response.json()
        ).then(
            data => {
                setProjectinfo(data)
            }
        )
    }, []);

    function deleteProjectFromList(key,message) {

        const newProjData = Projectinfo.filter(proj => proj._id !== key);
        setProjectinfo(newProjData);

        setToastVisible(true);
        setToastMessage(message);
        setToastType("success");
        setTimeout(() => {
            setToastVisible(false)
        }, 4000);

    }

    return (
        <>
        
                {toastVisible ? <ToastComponent message={toastMessage} type={toastType} /> : null}
            <Navbar_after_login />
            <h1 className="projectLib">Project Library</h1>
            <Filter_bar_Project />

            {/* {cardGenerator(Projectinfo)} */}
            {/* {console.log("length: " + Projectinfo.length)} */}
            {
                Projectinfo.map(
                    (proj) => {
                        return (
                            <ProjectDisplay
                                id={proj._id}
                                name={proj.projectName}
                                tech={proj.tags}
                                description={proj.description}
                                projectinfo={proj.projectInfo}
                                video={proj.video}
                                projectlink={proj.projectLink}
                                team={proj.contributors}
                                image={proj.image}
                                admin={admin}
                                userID={userID}
                                deleteProjectFromList={deleteProjectFromList}
                            />
                        );
                    }
                )
            }
            <MyfooterAfterLogin />
        </>
    );
}
