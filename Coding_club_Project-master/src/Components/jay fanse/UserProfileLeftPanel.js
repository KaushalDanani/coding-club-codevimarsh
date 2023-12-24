import React, { useState } from "react";
import "./UserProfileLeftPanel.css";
// import dp from "../images/profile.jpeg";
import EditUserProfile from "./EditUserProfile.js";
import tagCollection from "./UserProfileTagsInfo.js";
import UserProfileSkillTagElement from "./UserProfileSkillTagElement.js";
import { Link } from "react-router-dom";

function UserProfileLeftPanel(props) {
  const ToggleStyle = {
    display: "flex",
  };

  console.log(props.userData.skills);

  const [showEdit, setShowEdit] = useState(false);
  
  function EditDP() {
    setShowEdit(!showEdit);
  }

  function displayTags(tagElement){
      return <UserProfileSkillTagElement 
      tag = {tagElement}
      />
  }

  const base64Img = `data:image/png;base64,${props.userData.profileImg}`;

  return (
    <div className="UPleftPanel">
      <div className="UPProfile">
        <div className="ProfileImg" onMouseEnter={EditDP} onMouseLeave={EditDP}>
          <img src={base64Img} alt="" className="ProfileImg"/>
        </div>
        <div className="ProfileName">
          {props.userData.fname} {props.userData.lname}
        </div>
        <div className="ProfileUsername">
          @{props.userData.username}
        </div>
        {(props.visitID==null) ? 
        <div className="ProfileEditLink">
          <Link to={`edit_profile/`}>Edit Profile</Link>
        </div>
        : null}
      </div>
      <div className="UPSkills">
        <div className="UPSkillsTitle">
          Skills
        </div>
        <div className="UPSkillsContent">
          {(props.userData.skills || []).map(displayTags)}
          <div className={((props.userData.skills || []).length == 0)?"skillPlaceHolder":"noPlaceHolder"}>
            Edit profile to add your skills here...
            <Link to={`edit_profile/`}><button>Edit</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileLeftPanel;
