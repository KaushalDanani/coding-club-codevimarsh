import Navbar_after_login from "../NavbarAfterLogin/Navbar_after_login.js";
import ProjectDisplay from "./ProjectDisplay.js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Filter_bar from "../ProjectLibrary/Filter_bar_Project.js";
import "./ProjectMain.css";
import MyfooterAfterLogin from "../FooterAfterLogin/MyfooterAfterLogin.js";
import HashLoader from "react-spinners/HashLoader.js";
import useUser from "../../store/userContext.js";
import ToastComponent from "../Toast/toastComponent.js";
import ProjectSkeleton from "./ProjectSkeleton.js";

export default function ProjectMain() {
  const { user, setUser } = useUser();

  const [isLoadingProject, setIsLoadingProject] = useState(false);
  const [admin, setAdmin] = useState("");
  const [userID, setUserID] = useState(null);
  const [changeImage, setChangeImage] = useState("true");
  const [Projectinfo, setProjectinfo] = useState([]);
  const [userUps, setUserUps] = useState([]);
  const [userData, setUserData] = useState("");
  const [base64Img, setBase64Img] = useState("");

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  useEffect(() => {
    if (user != null) {
      setAdmin(user.isAdmin);
      setUserID(user._id);
      setBase64Img(`data:image/png;base64,${user.profileImg}`);
    }
  }, [user]);

  const projedtDataFetch = async () => {
    if(userID != null){
      const reqBody = {
        uID: userID 
      }
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/project`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        });
        const data = await response.json();
        setProjectinfo(data.projects);
        setUserUps(data.userUps);
        setIsLoadingProject(false);
      } catch (err) {
        console.error(err, err.response);
      }
    }
  }

  useEffect(() => {
      setIsLoadingProject(true);
      projedtDataFetch();
  }, [userID]);

  function deleteProjectFromList(id, msg) {
    const filterProjects = Projectinfo.filter((project) => project._id !== id);
    setProjectinfo(filterProjects);
    setToastVisible(true);
    setToastMessage(msg);
    setToastType("success");
    setTimeout(() => {
      setToastVisible(false);
    }, 1500);
  }


  return (
    <>
      {toastVisible ? (
        <ToastComponent message={toastMessage} type={toastType} />
      ) : null}

      <Navbar_after_login imgData={base64Img} />
      {/* <div className='projectHeader'>
                <div className='imageConatainer'> <img id='proj_image' src="/images/projdis3.jpg" alt='discC' loading="lazy" /> </div>
                <h2 className='projTitle'>Projects</h2>
                <p className='project_oneliner'>The aim of argument, or of discussion, should not be victory, but progress.</p>
            </div> */}
      <div className="projectsContainer">
        <div className="projectCollaborationHeader">
          <div className="imageConatainer">
            {" "}
            <img
              id="pc_image"
              src="/images/project-collab-transperant.png"
              alt="Project Banner"
              loading="lazy"
            />{" "}
          </div>
          <h2 className="projectTitle">Projects</h2>
          <p className="project_collaboration_oneliner">
            The aim of argument, or of discussion, should not be victory, but
            progress.
          </p>
        </div>
        <div className="addProjCollab" style={{ width: "85%" }}>
          <Link to={"/project/add_project"}>
            {" "}
            <button
              className="ProjectCollaborationBtn"
              onMouseOut={() => setChangeImage(true)}
              onMouseOver={() => setChangeImage(false)}
            >
              {" "}
              Add{" "}
            </button>{" "}
          </Link>
        </div>
      </div>

      <hr
        style={{
          width: "85%",
          height: "2.5px",
          backgroundColor: "white",
          margin: "auto",
          marginBottom: "2.5vh",
        }}
      />

    {isLoadingProject ? <ProjectSkeleton />
    :
      <>
      {Projectinfo.length !== 0 ? (
          <div className="displayAllProjectsContainer scroll-container">
              {Projectinfo.map((proj) => (
                  <ProjectDisplay
                      key={proj._id}
                      data={proj}
                      admin={admin}
                      userID={userID}
                      team={proj.contributors}
                      value={userUps.includes(proj._id)}
                      deleteProjectFromList={deleteProjectFromList}
                  />
              ))}
          </div>
        ) : (
          <div className="discussionNullContent">
            <img src="/images/profileProjects.png" alt="No Data" loading="lazy"></img>
            <div className="nullContentInfo">
              No Projects to display :)
              <br></br>Be the first one to share your project!
            </div>
          </div>
        )}
      </>
    }

      <MyfooterAfterLogin />
    </>
  );
}
