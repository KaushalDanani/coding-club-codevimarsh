
import Navbar_after_login from "../NavbarAfterLogin/Navbar_after_login.js"
import ProjectDisplay from "./ProjectDisplay.js";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
// import Filter_bar from "../ProjectLibrary/Filter_bar_Project.js";
import "./ProjectMain.css"
import MyfooterAfterLogin from "../FooterAfterLogin/MyfooterAfterLogin.js";
import HashLoader from "react-spinners/HashLoader.js";

export default function ProjectMain(props){

    const [isLoadingProject, setIsLoadingProject] = useState(false);
    const [admin,setAdmin] = useState('');
    const [userID,setUserID] = useState('');
    const [changeImage, setChangeImage] = useState('true');
    const [Projectinfo, setProjectinfo] = useState([]);
    const [userData,setUserData] = useState('');
    const [base64Img,setBase64Img] = useState('');

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

                const response2 = await fetch('/navbar/profileImg/dataset')
                const data2 = await response2.json();
                setUserData(data2.data);
                setBase64Img(`data:image/png;base64,${data2.data.profileImg}`);
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
      <div className='loadingPage'>
        <HashLoader
            color={'#ffffff'}
            loading={isLoadingProject}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
      </div>
    </>

    return(
        <>  
            
            <Navbar_after_login imgData={base64Img} />
            {/* <div className='projectHeader'>
                <div className='imageConatainer'> <img id='proj_image' src="/images/projdis3.jpg" alt='discC' /> </div>
                <h2 className='projTitle'>Projects</h2>
                <p className='project_oneliner'>The aim of argument, or of discussion, should not be victory, but progress.</p>
            </div> */}
            <div className='projectsContainer'>
        <div className='projectCollaborationHeader'>
          <div className='imageConatainer'> <img id='pc_image' src="/images/project-collab.png" alt='PC' /> </div>
          <h2 className='projectTitle'>Projects</h2>
          <p className='project_collaboration_oneliner'>The aim of argument, or of discussion, should not be victory, but progress.</p>
        </div>
        <div className='addProjCollab' style={{width: '85%'}}>
          <Link to={'/project/add_project'}> <button className='ProjectCollaborationBtn'
            onMouseOut={() => setChangeImage(true)}
            onMouseOver={()=> setChangeImage(false)}> Add </button> </Link>
        </div>
        </div>
            
            <hr style={{width: '85%', height: '2.5px', backgroundColor: 'white', margin: 'auto', marginBottom: '2.5vh'}}/>

            
            {
                Projectinfo.length!==0 ? 
                
                Projectinfo.map(
                    (proj) => {
                        return(
                            <ProjectDisplay 
                                data = {proj}
                                admin = {admin}
                                userID = {userID} 
                            />
                        );
                    }
                )

                :
                <div className="discussionNullContent">
                    <div className="nullContentInfo">No Projects to display :)
                    <br></br>Be the first one to share your project!</div>
                </div>
            }
            
            <MyfooterAfterLogin/>
        </>
    );
}
