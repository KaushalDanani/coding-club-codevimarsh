import React, { useEffect } from 'react';
import { useState } from 'react';
import TechTag from './TechTag';
import "./ProjectCollabrationCard.css";

function ProjectCollabrationCard(props) {

  const [expand, setExpand] = useState('ture');
  const [isDiplay, setIsDiplay] = useState('true');
  const [base64Img,setBase64Img] = useState("");
  const [sameUser, setSameUser] = useState(true);

  useEffect( () => {
    if(props.userDetails.profileImg)
    {
      setBase64Img(`data:image/png;base64,${props.userDetails.profileImg}`);
    }

    fetch('/getUser/whoUpload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if(data.username == props.userDetails.username)
        setSameUser(true);
      else
        setSameUser(false);
    })
  },[props.userDetails.profileImg])


  function ProjectCollabrationCardDelete() {
    const allDeleteData = {
      projectCollabrationCardId : props.data._id
    }

    fetch('/delete/projectCollabration/data', {
      method: 'POST',
      body: JSON.stringify(allDeleteData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(data => {
    })
    alert("Project Collaboration Deleted Successfully...");
    window.location.reload();
  }

  return (
        <div className='project_c_card'>
            <div className='avtar'> <a href={`profile?visitID=${props.data.collabrationLeader}`}> <img src={base64Img} /> </a> </div>
            <div className='innercontent'>
                <div className='project_coll_header'>
                  <div>
                    <a href={`profile?visitID=${props.data.collabrationLeader}`}> 
                      <strong> {props.userDetails.username} </strong> 
                    </a>
                  </div>
                  <div>
                    <a href={`https://mail.google.com/mail/?view=cm&to=${props.userDetails.email}`}
                      target="_blank">
                      <input type="button" value="Contact" className="project_collab_btn" />
                    </a>
                    {sameUser ?
                      (<input type="button" value="Delete" className="project_collab_del_btn" onClick={ProjectCollabrationCardDelete} />)
                      : null
                    }
                  </div>
                </div> 
                <hr style={{margin: '0vh 0vh 2vh -2.5vw', height:'0.25vh', border: 'none', backgroundColor: 'black'}}/>

                <div className='project_coll_Title'> <strong> Project Title : </strong> 
                  <p className='project_col_title_content'> {props.data.collabrationTitle} </p> 
                </div>

                <div className='project_coll_tags'> <strong> Project Tags : </strong>
                  <div style={{display: 'inline'}}> 
                    {(props.data.collabrationTags).map((tagname) => (
                      <TechTag tagname={tagname} />
                    ))}
                  </div>
                </div>

                <div className={expand ? 'project_coll_description' : 'project_coll_description project_more_btn_show'}> <strong> Project Description : </strong> 
                  <p className='project_coll_description_content'> {props.data.collabrationDescription} </p>
                </div>
                <button className='project_coll_more_btn' onClick={() => setExpand(!expand)}> {expand ? 'More' : 'Less'} </button> <br/>
            </div>
        </div>
  )
}

export default ProjectCollabrationCard