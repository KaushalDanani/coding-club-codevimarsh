import React, { useEffect, useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../Firebase.js"
import './AddProject.css'
import { Link, useNavigate } from "react-router-dom";
import ToastComponent from "../Toast/toastComponent.js";


function addproject_close() {
    const closebtn = document.getElementById("AddProject");
    closebtn.style.display = "none";
}

export function addproject_open() {
    const closebtn = document.getElementById("AddProject");
    closebtn.style.display = "block";
}

export default function AddProject() {

    const [Image, setImage] = useState("");
    const [Video, setVideo] = useState("");
    const [Team, setTeam] = useState([]);
    const [ProjectName, setProjectName] = useState("");
    const [ProjectDescription, setProjectDescription] = useState("");
    const [ProjectTags, setProjectTags] = useState("");
    const [ProjectLink, setProjectLink] = useState("");
    const [ProjectInfo, setProjectInfo] = useState("");

    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");

    const [imgPercentage, setImgPercentage] = useState(0);
    const [videoPercentage, setVideoPercentage] = useState(0);
    const [imgDownloadUrl, setImgDownloadUrl] = useState();
    const [videoDownloadUrl, setVideoDownloadUrl] = useState();


    const navigate = useNavigate();


    const uploadFile = async (file, fileType) => {
        const storage = getStorage(app)
        const selectFolder = fileType === "imgURL" ? "images/" : "videos/";
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, selectFolder + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (fileType == "imgURL")
                    setImgPercentage(Math.round(progress))
                else
                    setVideoPercentage(Math.round(progress))
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        alert("Error: " + error)
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        alert("Error: " + error)
                        break;
                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        alert("Error: " + error)
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    // console.log('File available at - ', downloadURL);
                    if (fileType === "imgURL")
                        setImgDownloadUrl(downloadURL);
                    else
                        setVideoDownloadUrl(downloadURL);
                });
            }
        );
    }


    async function addImage(e) {
        const image = e.target.files[0];
        if (image !== Image)
            setImage(image);
    }

    async function addVideo(e) {
        const video = e.target.files[0];
        if (video !== Video)
            setVideo(video);
    }

    function addTeam() {
        var team = document.getElementById("teamInfo").value;
        team = team.split(",").map(tag => tag.trim());
        setTeam(team);
    }

    function addProjectName() {
        var projectName = document.getElementById("projectName").value;
        setProjectName(projectName);
    }

    function addProjectDescription() {
        var projectDescription = document.getElementById("projectDescription").value;
        setProjectDescription(projectDescription);
    }

    function addProjectTags() {
        var projectTags = document.getElementById("projectTags").value;
        projectTags = projectTags.split(",").map(tag => tag.trim());
        if (projectTags.length == 1 && projectTags[0] == "") {
            setProjectTags([])
        }
        else {
            setProjectTags(projectTags);
        }
    }

    function addProjectLink() {
        var projectLink = document.getElementById("projectLink").value;
        setProjectLink(projectLink);
    }

    function addProjectInfo() {
        var projectInfo = document.getElementById("projectInfo").value;
        setProjectInfo(projectInfo);
    }


    async function addProject(e) {

        e.preventDefault();
        if (Image)
            await uploadFile(Image, "imgURL");
        if (Video)
            await uploadFile(Video, "videoURL");
    }

    useEffect(() => {

        if (imgDownloadUrl && videoDownloadUrl) {
            fetch("http://localhost:5000/project/addProject", {
                method: 'POST',
                body: JSON.stringify({
                    "projectname": ProjectName,
                    "projectdescription": ProjectDescription,
                    "projecttags": ProjectTags,
                    "projectteam": Team,
                    "projectlink": ProjectLink,
                    "projectinfo": ProjectInfo,
                    "projectimage": imgDownloadUrl,
                    "projectvideo": videoDownloadUrl
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then((data) => {

                    setToastVisible(true);
                    setToastMessage(data.message);
                    setToastType("success");
                    setTimeout(() => {
                        setToastVisible(false)
                        navigate('/project');
                    }, 1500);
                })
        }
    }, [imgDownloadUrl && videoDownloadUrl])

    function clearProjectData() {
        document.getElementById("teamInfo").value = "";
        setTeam("");

        document.getElementById("projectName").value = "";
        setProjectName("");

        document.getElementById("projectDescription").value = "";
        setProjectDescription("");

        document.getElementById("projectLink").value = "";
        setProjectLink("")

        document.getElementById("projectInfo").value = "";
        setProjectInfo("");

        document.getElementById("projectTags").value = "";
        setProjectTags([])
    }


    return (
        <>
            {toastVisible ? <ToastComponent message={toastMessage} type={toastType} /> : null}

            <Link to={'/project'}>
                <div className='ObjectBackBtn'></div>
            </Link>
            <div className="addObjectContainer">
                <div className="addObjectHeader">
                    <h1>Add Your Project</h1>
                </div>
                <form className='addObjectBody scroll-container' onSubmit={addProject}>
                    {/* <div className="addprospace">
                        <label>Project Name : </label>
                        <input type="text" id="projectName" onChange={addProjectName} /><br />
                    </div> */}
                    <div className="addObjectRow projectRow">
                        <div>Project Name</div>
                        <div>:</div>
                        <input type="text" name="pname" id="projectName" onChange={addProjectName} required></input>
                    </div>

                    {/* <div className="addprospace">
                        <label>Project Description : </label>
                        <textarea style={{ 'display': 'block', 'width': '100%' }}
                            type="text" id="projectDescription" onChange={addProjectDescription} />
                    </div> */}
                    <div className="addObjectRow projectRow">
                        <div>Description</div>
                        <div>:</div>
                        <textarea name="pojectDescription" id="projectDescription" onChange={addProjectDescription} cols="" rows="4" required></textarea>
                    </div>

                    {/* <div className="addprospace">
                        <label>Technology used : </label>
                        <input type="text" id="projectTags" onChange={addProjectTags} /><br />
                    </div> */}
                    <div className="addObjectRow projectRow">
                        <div>Technologies</div>
                        <div>:</div>
                        <input type="text" name="projectTech"
                        id="projectTags" onChange={addProjectTags} required></input>
                    </div>

                    {/* <div className="addprospace">
                        <label>Project Link : </label>
                        <input type="text" id="projectLink" onChange={addProjectLink} /><br />
                    </div> */}
                    <div className="addObjectRow projectRow">
                        <div>Project Link</div>
                        <div>:</div>
                        <input type="text" name="projectLink"
                        id="projectLink" onChange={addProjectLink} required></input>
                    </div>

                    <div className="addProjectRow">
                        <label>Name of All Team Members </label>
                        <input type="text" id="teamInfo" placeholder="username of all team members (separate by ',')" onChange={addTeam} required/>
                    </div>
                    {/* <div className="addObjectRow">
                        <div>Name of Team Members</div>
                        <div>:</div>
                        <input type="text" name="projectTeamInfo"
                        id="teamInfo" placeholder="username of all team member(separate by ',' only, not space)" onChange={addTeam} required></input>
                    </div> */}

                    {/* <div className="addprospace">
                        <label>Project Information : </label>
                        <textarea style={{ 'display': 'block', 'width': '100%' }}
                            type="text" id="projectInfo" onChange={addProjectInfo} />
                    </div> */}
                    <div className="addObjectRow projectRow">
                        <div>Project Information</div>
                        <div>:</div>
                        <textarea name="pojectInfo" id="projectInfo" onChange={addProjectInfo} cols="" rows="4" required></textarea>
                    </div>

                    <div className="addProjectRow">
                        <label>Project Image (Thumbnail) </label> {imgPercentage > 0 ? "Uploading: " + imgPercentage + "%" : ""}
                        <input className="fileInput" type='file' accept="image/*" name='datafile' onChange={(e) => { addImage(e) }} required/>
                    </div>

                    <div className="addProjectRow">
                        <label>Project Video </label> {videoPercentage > 0 ? "Uploading: " + videoPercentage + "%" : ""}
                        <input className="fileInput" type='file' accept="video/*" name='datafile' onChange={(e) => { addVideo(e) }} required/>
                    </div>

                    <div className="addObjectBtn extraProjectBtn">
                        <button onClick={clearProjectData}>Clear</button>
                        <button type="submit">Add My Project</button>
                    </div>
                </form>

            </div>
        </>
    );
}