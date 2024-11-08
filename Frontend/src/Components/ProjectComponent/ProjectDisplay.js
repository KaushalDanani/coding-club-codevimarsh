import React, { useEffect, useState } from "react";
import './ProjectDisplay.css'
import TechTag from "../Tags/TechTag.js";
import Upvote from "../DiscussionDetails/upvote.js";

function ProjectDisplay(props) {
    
    const [isProjectDataFetching, setIsProjectDataFetching] = useState(true);
    const [admin,setAdmin] = useState(false);
    const [userID,setUserID] = useState('');
    const [hover,setHover] = useState(false);
    const [expand, setExpand] = useState('ture');
    const [Fnamelname,setFnamelname] = useState([]);


    useEffect(() => {
        if(props.userID!=null)
            setUserID(props.userID);
    },[props.userID])

    useEffect(() => {
        if(props.admin!=null)
            setAdmin(props.admin);
    },[props.admin])



    function deletebtn(){
        let b = false;
        // console.log(admin);
        
        for(let i=0;i<=props.team.length;i++){
            if(admin===true || props.team[i]===userID ){
                b = true;
            }
        }
        
        if(b === false){
            const closebtn = document.getElementById("btnname" + props.data.projectName + "dlt");
            closebtn.style.display = "none";
        }
        else{
            const closebtn = document.getElementById("btnname" + props.data.projectName + "dlt");
            closebtn.style.display = "block";
        }
    }

    useEffect(() => {
        if(props.team){
            deletebtn();
        }
    }, [props.team,userID]);
    
    function delete_project(){
        
        const conf = window.confirm('Are you sure you want to delete Project?');
        if(conf)
        {
            // console.log(props.data._id);
            const deleteProjectData = {
                projectCollaborationCardId: props.data._id
            }
        
            fetch(`${process.env.REACT_APP_BACKEND_URL}/project/delete`,{
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

    useEffect(() => {
        setIsProjectDataFetching(true);
        if(props.data.contributors){
                fetch(`${process.env.REACT_APP_BACKEND_URL}/project/members`,{
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
                        setIsProjectDataFetching(false);
                    }
                )
            }
    }, [props.data.contributors]);

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
                            <img src={props.data.image}  alt="Project Image" loading="lazy" ></img>
                        </a>
                    </div>
                    <div>
                    <a href={props.data.projectLink} target="_blank" onMouseEnter={toggleLink} onMouseLeave={toggleLink}>
                        <div className="projectname">
                            {props.data.projectName} {hover ? <span className="linkImg"></span> : null}
                        </div>
                    </a>
                        
                        <div className="projectdiscription">Project Description : <span> {props.data.description}</span> </div>
                        <div className="projecttech">Technologies : {props.data.tags.map((tagname) => <TechTag tagname={tagname} key={props.data._id+tagname} />)} </div>
                        
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
                            {Fnamelname.map((data, idx)=>{
                                
                                return(
                                    <li key={idx}>{data.fname} {data.lname}</li>
                                )
                            })}
                        </ul>
                    </div>
                </div> : null }

                <div className="projbtn">
                    <Upvote className="projdispbutton" value={props.value} Id={props.data._id} type='p' count={props.data.upvotes} user={props.userID} />
                    <div>
                        <button className="projdispbutton"  onClick={() => setExpand(!expand)}> {expand ? 'Show More' : 'Show Less'}</button>
                        <button id={`btnname${props.data.projectName}dlt`} className="projdispbutton" onClick={() => {delete_project()}}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default React.memo(ProjectDisplay);