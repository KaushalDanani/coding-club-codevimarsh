// import Projects from "./Projects.js"
// import Filter_bar from "../Jay prajapati/Filter_bar.js"
// import { Link } from "react-router-dom"
import Navbar_after_login from "../kaushal/Navbar_after_login.js"
import ProjectDisplay from "../Innercomp/ProjectDisplay.js"
import React, { useEffect, useState } from "react";
import AddProject from "../Innercomp/AddProject.js";
import { Link } from 'react-router-dom';
// import Filter_bar from "../ProjectLibrary/Filter_bar_Project.js";
import "./ProjectMain.css"
import MyfooterAfterLogin from "../MyfooterAfterLogin.js";
import HashLoader from "react-spinners/HashLoader.js";

export default function ProjectMain(props){

    const [isLoadingProject, setIsLoadingProject] = useState(false);
    const [admin,setAdmin] = useState('');
    const [userID,setUserID] = useState('');
    const [changeImage, setChangeImage] = useState('true');
    const [Projectinfo, setProjectinfo] = useState([{}]);

    useEffect( ()=> {
        if(props.user!=null)
        {
            setAdmin(props.user.isAdmin);
            setUserID(props.user._id);
        }
    },[props.user])
    
    useEffect(() => {

        (async () => {
            setIsLoadingProject(true);
            try {
                const response = await fetch("/project", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json();
                setProjectinfo(data);
            }
            catch(err)
            {
                console.error(err, err.response);
            }
            setIsLoadingProject(false);
        })();

    }, []);

    if (isLoadingProject)
    return <>
      {/* <Navbar_after_login /> */}
      <div className='loadingPage'>
        <HashLoader
            color={'#ffffff'}
            loading={isLoadingProject}
            // cssOverride={override}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
      </div>
    </>

    return(
        <>  
            <Navbar_after_login/>
            {/* <div className='projectHeader'>
                <div className='imageConatainer'> <img id='proj_image' src="/images/projdis3.jpg" alt='discC' /> </div>
                <h2 className='projTitle'>Projects</h2>
                <p className='project_oneliner'>The aim of argument, or of discussion, should not be victory, but progress.</p>
            </div> */}
            <div className='projectsContainer'>
        <div className='projectCollabrationHeader'>
          <div className='imageConatainer'> <img id='pc_image' src="/images/project-collab.png" alt='PC' /> </div>
          <h2 className='projectTitle'>Projects</h2>
          <p className='project_collabration_oneliner'>The aim of argument, or of discussion, should not be victory, but progress.</p>
        </div>
        <div className='addProjCollab' style={{width: '85%'}}>
          <Link to={'/project/add_project'}> <button className={changeImage ? 'ProjectCollabrationBtn changeAddImage' : 'ProjectCollabrationBtn'} 
            onMouseOut={() => setChangeImage(true)}
            onMouseOver={()=> setChangeImage(false)}> Add </button> </Link>
        </div>
        </div>
            {/* <Filter_bar_Project /> */}
            <hr style={{width: '85%', height: '2.5px', backgroundColor: 'white', margin: 'auto', marginBottom: '2.5vh'}}/>

            {/* <AddProject/> */}
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
                                admin = {admin}
                                userID = {userID} 
                            />
                        );
                    }
                )
            }
            
            <MyfooterAfterLogin/>
        </>
    );
}
