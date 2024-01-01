import React, { useEffect, useState } from "react";
import './AddProject.css'

function addproject_close(){
    const closebtn = document.getElementById("AddProject");
    closebtn.style.display = "none";
}

export function addproject_open(){
    const closebtn = document.getElementById("AddProject");
    closebtn.style.display = "block";
}

export default function AddProject(){

    const [Image,setImage] = useState("");
    const [Video,setVideo] = useState("");
    const [Team,setTeam] = useState([]);
    const [ProjectName , setProjectName] = useState("");
    const [ProjectDescription , setProjectDescription] = useState("");
    const [ProjectTags , setProjectTags] = useState("");
    const [ProjectLink , setProjectLink] = useState("");
    const [ProjectInfo , setProjectInfo] = useState("");

    async function addImage(e) {
        const image = e.target.files[0];  
        setImage(await convertBase64(image));
    }

    async function addVideo(e) {
        const image = e.target.files[0];
        alert("adding");
        const videoData = await convertBase64(image);
        setVideo(videoData);
        // alert(videoData);
        alert('video added');
    }
    

    function addTeam(){
        var team = document.getElementById("teamInfo").value;
        team = team.split(",");
        setTeam(team);
    }

    function addProjectName(){
        var projectName = document.getElementById("projectName").value;
        setProjectName(projectName);
    }

    function addProjectDescription(){
        var projectDescription = document.getElementById("projectDescription").value;
        setProjectDescription(projectDescription);
    }

    function addProjectTags(){
        var projectTags = document.getElementById("projectTags").value;
        projectTags = projectTags.split(",")
        if(projectTags.length==1 && projectTags[0]=="")
        {
            setProjectTags([])
        }
        else
        {
            setProjectTags(projectTags);
        }
    }

    function addProjectLink(){
        var projectLink = document.getElementById("projectLink").value;
        setProjectLink(projectLink);
    }

    function addProjectInfo(){
        var projectInfo = document.getElementById("projectInfo").value;
        setProjectInfo(projectInfo);
    }

    function convertBase64(file){
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error)=>{
                reject(error);
            }
        })
    }

    function add(){
        fetch("/addproject",{
            method: 'POST',
            body: JSON.stringify({
                "projectname" : ProjectName,
                "projectdescription" : ProjectDescription,
                "projecttags" : ProjectTags,
                "projectteam" : Team,
                "projectlink" : ProjectLink,
                "projectinfo" : ProjectInfo,
                "projectimage" : Image,
                "projectvideo" : Video
            }),
            headers: {
              'Content-Type': 'application/json'
                }
            })
        // console.log(ProjectName);
        // console.log(ProjectDescription);
        // console.log(ProjectTags);
        // console.log(Team);
        // console.log(ProjectLink);
        // console.log(ProjectInfo);

            window.location.reload();
            addproject_close();
    }

    

    return(
        <>
        <form className="AddProject" id="AddProject">
        
        <div className="titaldiv">
            {/* <div className="addpro_close" onClick={addproject_close}>
                    <img src="/images/close_image.webp"></img>
            </div> */}
            <h1>Add Your Project</h1>
        </div>

        {/* <hr></hr>   */}

        <div className="fillinfodiv">
            <div className="addprospace">
            <label>Project Name : </label>
            <input type="text" id="projectName"  onChange={addProjectName}/><br/>
            </div>

            <div className="addprospace">
            <label>Project Description : </label>
            <textarea style={{'display':'block','width':'100%'}}
            type="text" id="projectDescription" onChange={addProjectDescription}/>
            </div>

            <div className="addprospace">
            <label>Technology used : </label>
            <input type="text" id="projectTags"  onChange={addProjectTags}/><br/>
            </div>

            <div className="addprospace">
            <label>Project Link : </label>
            <input type="text" id="projectLink"  onChange={addProjectLink}/><br/>
            </div>

            <div className="addprospace">
            <label>Name of All Team Member : </label>
            <input type="text" id="teamInfo" placeholder="username of all team member(separate by ',' only, not space)" onChange={addTeam}/><br/>
            </div>

            <div className="addprospace">
            <label>Project Information : </label>
            <textarea style={{'display':'block','width':'100%'}}
            type="text" id="projectInfo"  onChange={addProjectInfo}/>
            </div>

            <div className="addprospace">
            <label>Project Image(thumbnail) : </label>
            <input type='file' name='datafile' onChange={(e)=>{addImage(e)}}/><br/>
            </div>

            <div className="addprospace">
            <label>Project Video : </label>
            <input type='file' name='datafile' onChange={(e)=>{addVideo(e)}}/><br/>
            </div>

            {/* <div className="addprospace " >
            <input type="button" value="Add My Project" id="addproject" onClick={add}/>
            </div> */}
            

            <div className="addprojbtndiv">
                
                <div className="addproj_btn btn" onClick={addproject_close}>
                    Cancle
                </div>

                {/* <div class="text-box">
                    <a href="#" class="btn btn-white btn-        animate">click me</a>
                </div> */}

                <div className="addproj_btn" onClick={add}>
                    Add My Project
                </div>
                
            </div>
        </div>

        </form>
        </>
    );
}