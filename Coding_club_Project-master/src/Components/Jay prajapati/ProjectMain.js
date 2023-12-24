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

export default function ProjectMain(){

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

    return(
        <>  
            <Navbar_after_login/>
            <h1 className="projectLib">Project Library</h1>
            <Filter_bar_Project/>

            <AddProject/>
            {/* {cardGenerator(Projectinfo)} */}
            {/* {console.log("length: " + Projectinfo.length)} */}
            {
                
                Projectinfo.map(
                    (proj) => {
                        return(
                            <ProjectDisplay 
                                name = {proj.projectName}
                                tech = {proj.tags}
                                description = {proj.description}
                                projectinfo = {proj.projectInfo}
                                video = {proj.video}
                                projectlink = {proj.projectLink}
                                team = {proj.contributors}
                                image = {proj.image}
                            />
                        );
                    }
                )
            }
            <MyfooterAfterLogin/>
        </>
    );
}
