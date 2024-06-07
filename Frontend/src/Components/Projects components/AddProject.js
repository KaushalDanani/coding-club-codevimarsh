import React, { useEffect, useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../Firebase.js"
import './AddProject.css'
import { Link, useNavigate } from "react-router-dom";
import ToastComponent from "../jay fanse/toastComponent";


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
            if(fileType == "imgURL")
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
                alert("Error: "+error)
                break;
                case 'storage/canceled':
                // User canceled the upload
                alert("Error: "+error)
                break;
                case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                alert("Error: "+error)
                break;
            }
        }, 
        () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log('File available at - ', downloadURL);
            if(fileType === "imgURL")
                setImgDownloadUrl(downloadURL);
            else
                setVideoDownloadUrl(downloadURL);
        });
        }
        );
    }


    async function addImage(e) {
        const image = e.target.files[0];
        if(image !== Image)
            setImage(image);
    }

    async function addVideo(e) {
        const video = e.target.files[0];
        if(video !== Video)
            setVideo(video);
    }

    function addTeam() {
        var team = document.getElementById("teamInfo").value;
        team = team.split(",");
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
        projectTags = projectTags.split(",")
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


    async function add() {

        if(Image)
            await uploadFile(Image, "imgURL");
        if(Video)
            await uploadFile(Video, "videoURL");
    }

    useEffect(() => {

        if(imgDownloadUrl && videoDownloadUrl)
        {
            fetch("/addproject", {
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



    return (
        <>
            {toastVisible ? <ToastComponent message={toastMessage} type={toastType} /> : null}

            <Link to={'/project'}>
                <div className='projBackBtn'></div>
            </Link>
            <div className="Addprojectmain">

                <form className="AddProject" id="AddProject">

                    <div className="titaldiv">
                       
                        <h1>Add Your Project</h1>
                    </div>

                    

                    <div className="fillinfodiv">
                        <div className="addprospace">
                            <label>Project Name : </label>
                            <input type="text" id="projectName" onChange={addProjectName} /><br />
                        </div>

                        <div className="addprospace">
                            <label>Project Description : </label>
                            <textarea style={{ 'display': 'block', 'width': '100%' }}
                                type="text" id="projectDescription" onChange={addProjectDescription} />
                        </div>

                        <div className="addprospace">
                            <label>Technology used : </label>
                            <input type="text" id="projectTags" onChange={addProjectTags} /><br />
                        </div>

                        <div className="addprospace">
                            <label>Project Link : </label>
                            <input type="text" id="projectLink" onChange={addProjectLink} /><br />
                        </div>

                        <div className="addprospace">
                            <label>Name of All Team Member : </label>
                            <input type="text" id="teamInfo" placeholder="username of all team member(separate by ',' only, not space)" onChange={addTeam} /><br />
                        </div>

                        <div className="addprospace">
                            <label>Project Information : </label>
                            <textarea style={{ 'display': 'block', 'width': '100%' }}
                                type="text" id="projectInfo" onChange={addProjectInfo} />
                        </div>

                        <div className="addprospace">
                            <label>Project Image(thumbnail) : </label> {imgPercentage > 0 ? "Uploading: "+imgPercentage+"%" : ""}
                            <input type='file' accept="image/*" name='datafile' onChange={(e) => { addImage(e) }} /><br />
                        </div>

                        <div className="addprospace">
                            <label>Project Video : </label> {videoPercentage > 0 ? "Uploading: "+videoPercentage+"%" : ""}
                            <input type='file' accept="video/*" name='datafile' onChange={(e) => { addVideo(e) }} /><br />
                        </div>

                      


                        <div className="addprojbtndiv">

                            <Link to={'/project'}><div className="addproj_btn" onClick={addproject_close}>
                                Cancel
                            </div></Link>

                         

                            <div className="addproj_btn" onClick={add}>
                                Add My Project
                            </div>

                        </div>
                    </div>

                </form>
            </div>
        </>
    );
}