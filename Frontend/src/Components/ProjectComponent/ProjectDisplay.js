import React, { useEffect, useState } from "react";
import './ProjectDisplay.css'
import TechTag from "../Tags/TechTag.js";

export default function ProjectDisplay(props) {
    


    const [admin,setAdmin] = useState('');
    const [userID,setUserID] = useState('');
    const [hover,setHover] = useState(false);



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
        console.log(admin);
        
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

    function f(){
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
            fetch("/deleteproject",{
                method: 'POST',
                body: JSON.stringify({
                    "project_name" : proj_name,
                    
                }),
                headers: {
                'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    props.deleteProjectFromList(props.id,data.message);
                });

                
                
        }

        function video(){
            if(props.video){
                return(
                    <source type="video/mp4" src={props.video}></source>
                )
            }
        }

        function image(){
            if(props.image){
                return(
                    <img src={props.image}  alt="project image"></img>
                )
            }
        }

        const [Fnamelname,setFnamelname] = useState([]);
        useEffect(() => {
            if(props.team){
                    fetch("/profile/projects/members",{
                        method : 'POST',
                        headers : {
                            "Accept" : 'application/json',
                            'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify({
                            "contributors" : props.team
                        })
                    }).then(
                        response => response.json()
                    ).then(
                        (data) => {
                            setFnamelname(data);
                        }
                    )
                }
        }, [props.team]);

        function addtags(){
            if(props.tech){
                if(props.tech.length!=1 || props.tech[0]!="")
                {
                return(
                    props.tech.map(techtags)
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
                       
                        <a href={props.projectlink} target="_blank" >
                        {image()}
                        </a>
                    </div>
                    <div>
                    <a href={props.projectlink} target="_blank" onMouseEnter={toggleLink} onMouseLeave={toggleLink}><span className="projectname">{props.name}</span></a>
                        {hover ? <span className="linkImg"></span> : null}
                        <p className="projectdiscription">Project Description : {props.description}</p>
                        <p className="projecttech">Technology Used :</p>
                        {addtags()}

                    </div>

                </div>

                <div className="video_info" id={"video_info"+props.name}>
                    <div>
                        <video controls>
                            
                            {video()}
                        </video>
                    </div>
                    <div>
                        <h2>Project Information :</h2>
                        <p className="projectinfo">{props.projectinfo}</p>
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
                </div>
                {/* <div className="projbtndlt">
                    
                </div> */}
                <div className="projbtn">
                    <button className="projdispbutton" id={"btnname" + props.name} onClick={f}>Show More</button>
                    <button className="projdispbutton" id={"btnname" + props.name + "dlt"} onClick={() => {delete_project(props.name)}}>Delete</button>
                </div>
            </div>
        </div>
        </>
    );
}


