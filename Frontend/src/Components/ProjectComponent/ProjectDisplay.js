import React, { useEffect, useState } from "react";
import './ProjectDisplay.css'
import TechTag from "../Tags/TechTag.js";

export default function ProjectDisplay(props) {
    
    const [admin,setAdmin] = useState('');
    const [userID,setUserID] = useState('');
    const [hover,setHover] = useState(false);
    const [expand, setExpand] = useState('ture');


    useEffect(  () => {
        if(props.userID!=null)
        setUserID(props.userID);
    },[props.userID])

    useEffect(  () => {
        if(props.admin!=null)
        setAdmin(props.admin);
    },[props.admin])



    function deletebtn(){
        var b = false;
        // console.log(admin);
        
        for(let i=0;i<=props.team.length;i++){
            if(admin===true || props.team[i]===userID ){
                b = true;
            }
        }
        
        if(b == false){
            const closebtn = document.getElementById("btnname" + props.name + "dlt");
            closebtn.style.display = "none";
        }
        else{
            const closebtn = document.getElementById("btnname" + props.name + "dlt");
            closebtn.style.display = "block";
        }
    }

    useEffect(() => {
        if(props.team){
                deletebtn();
        }
    }, [props.team,userID]);

    function showProjectData(){
        var x = document.getElementById("video_info"+props.name);
        var y = document.getElementById("btnname" + props.name);
        if (x.style.display === "none" || x.style.display === "") {

            x.style.display = "block";
            y.innerHTML = "Show Less";

        } else {
            x.style.display = "none";
            y.innerHTML = "Show More";
        }
    }
    
        function delete_project(proj_name){

            const conf = window.confirm('Are you sure you want to delete Project?');
            if(conf)
            {
                const deleteProjectData = {
                    projectCollaborationCardId : props.data._id
                }
            
                fetch("/deleteproject",{
                    method: 'POST',
                    body: JSON.stringify(deleteProjectData),
                    headers: {
                    'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        props.deleteProjectFromList(props.data._id,data.message);
                    });

            }  
        }

        function video(){
            if(props.data.video){
                return(
                    <source type="video/mp4" src={props.data.video}></source>
                )
            }
        }

        function image(){
            if(props.data.image){
                return(
                    <img src={props.data.image}  alt="project image"></img>
                )
            }
        }

        const [Fnamelname,setFnamelname] = useState([]);
        useEffect(() => {
            if(props.data.contributors){
                    fetch("/profile/projects/members",{
                        method : 'POST',
                        headers : {
                            "Accept" : 'application/json',
                            'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify({
                            contributors: props.data.contributors
                        })
                    }).then(
                        response => response.json()
                    ).then(
                        (data) => {
                            setFnamelname(data);
                        }
                    )
                }
        }, [props.data.contributors]);

        function addtags(){
            if(props.data.tags){
                if(props.data.tags.length!=1 || props.data.tags[0]!="")
                {
                return(
                    props.data.tags.map(techtags)
                )
                }
            }
        }
        
        function techtags(tag){
            return(
                <TechTag
                    tagname = {tag}
                />
            )
        }

        function toggleLink(){
            setHover(!hover);
        }

    return (
        <>
        {/* {toastVisible ? <ToastComponent message={toastMessage} type={toastType} /> : null} */}
        <div className="projectmain">
            <div className="projdisplay">

                <div className="projdispheader">
                    <div>
                        <a href={props.data.projectLink} target="_blank" >
                        {image()}
                        </a>
                    </div>
                    <div>
                    <a href={props.data.projectLink} target="_blank" onMouseEnter={toggleLink} onMouseLeave={toggleLink}>
                        <div className="projectname">
                            {props.data.projectName} {hover ? <span className="linkImg"></span> : null}
                        </div>
                    </a>
                        
                        <div className="projectdiscription">Project Description : <span> {props.data.description}</span> </div>
                        <div className="projecttech">Technologies : <span> {addtags()} </span></div>
                        
                    </div>

                </div>

                { !expand ? <div className="video_info">
                    <div>
                        <video controls>
                            {video()}
                        </video>
                    </div>
                    <div>
                        <h2>Project Information :</h2>
                        <p className="projectinfo">{props.data.projectInfo}</p>
                    </div>
                    <div className="teaminfo">
                        <h2>Team Member</h2>
                        <ul>
                            {Fnamelname.map((data)=>{
                                
                                return(
                                    <li>{data.fname} {data.lname}</li>
                                )
                            })}
                        </ul>
                    </div>
                </div> : null }

                <div className="projbtn">
                    <button className="projdispbutton"  onClick={() => setExpand(!expand)}> {expand ? 'Show More' : 'Show Less'}</button>
                    <button className="projdispbutton" onClick={() => {delete_project(props.name)}}>Delete</button>
                </div>
            </div>
        </div>
        </>
    );
}


