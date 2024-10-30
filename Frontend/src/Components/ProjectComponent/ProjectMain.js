import Navbar_after_login from "../NavbarAfterLogin/Navbar_after_login.js";
import ProjectDisplay from "./ProjectDisplay.js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Filter_bar from "../ProjectLibrary/Filter_bar_Project.js";
import "./ProjectMain.css";
import MyfooterAfterLogin from "../FooterAfterLogin/MyfooterAfterLogin.js";
import useUser from "../../store/userContext.js";
import ToastComponent from "../Toast/toastComponent.js";
import ProjectSkeleton from "./ProjectSkeleton.js";
import SearchBar from "../SearchBox/SearchBar.js";

export default function ProjectMain() {
  const { user, setUser } = useUser();

  const [searchValue, setSearchValue] = useState("");
  const [isLoadingProject, setIsLoadingProject] = useState(false);
  const [admin, setAdmin] = useState("");
  const [userID, setUserID] = useState(null);
  const [changeImage, setChangeImage] = useState("true");
  const [projectInfo, setProjectInfo] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [userUps, setUserUps] = useState([]);
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

  useEffect(() => {
    if(searchValue != "") {
        const filterProjectsRelativeTags = projectInfo.filter((project) =>
          project.tags.toString().toLowerCase().includes(searchValue.toLowerCase()));

        setFilteredProjects(filterProjectsRelativeTags);
    }
    else 
      setFilteredProjects(projectInfo);
    
  }, [searchValue])

  const handleSortOperation = () => {
    if(projectInfo.length != 0)
    {
      const sortByUpvotesProjectList = [...filteredProjects].sort((a,b) => b.upvotes - a.upvotes);
      setFilteredProjects(sortByUpvotesProjectList);
    }
  }

  const handleSearch = (searchVal) => {
    setSearchValue(searchVal);
  }

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
        setProjectInfo(data.projects.reverse());
        setFilteredProjects(data.projects);
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
    const filterProjects = projectInfo.filter((project) => project._id !== id);
    setProjectInfo(filterProjects);
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

      <div className="projectsContainer">
        <div className="projectCollaborationHeader">
          <div className="imageConatainer">
            <img
              id="pc_image"
              src="/images/project-collab-transperant.png"
              alt="Project Banner"
              loading="lazy"
            />
          </div>
          <h2 className="projectTitle">Projects</h2>
          <p className="project_collaboration_oneliner">
            The aim of argument, or of discussion, should not be victory, but
            progress.
          </p>
        </div>

        <div className="operationsOnProjectData">
          <Link to={"/project/add_project"}>
            <button
              className="ProjectCollaborationBtn"
              onMouseOut={() => setChangeImage(true)}
              onMouseOver={() => setChangeImage(false)}>
              Add
            </button>
          </Link>
          <div className='sort-search-operations'>
            <button className='SortByUpvotesBtn' onClick={handleSortOperation}>Sort by Upvotes</button>
            <SearchBar sendBackSearchValue={handleSearch} type='project' />
          </div>
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
      {filteredProjects.length !== 0 ? (
          <div className="displayAllProjectsContainer scroll-container">
              {filteredProjects.map((proj) => (
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
