import React, { useEffect, useRef, useState } from "react";
import "./UserProfileLeftPanel.css";
import VanillaTilt from 'vanilla-tilt';
import UserProfileSkillTagElement from "./UserProfileSkillTagElement.js";
import { Link } from "react-router-dom";
import useUser from "../../store/userContext.js";

function Tilt(props) {
  const { options, ...rest } = props;
  const tilt = useRef(null);

  
  useEffect(() => {
    VanillaTilt.init(tilt.current, options);
  }, [options]);

  return <div ref={tilt} {...rest} />;
}

function UserProfileLeftPanel(props) {
  const [user, SetUser] = useState(props.userData);

  const [showEdit, setShowEdit] = useState(false);
  const base64Img = `data:image/png;base64,${user.profileImg}`;
  
  useEffect(() => {
    if(props.userData){
      SetUser(props.userData);
    }
  },[props.userData]);


  function EditDP() {
    setShowEdit(!showEdit);
  }

  function displayTags(tagElement){
      return <UserProfileSkillTagElement 
      tag = {tagElement}
      />
  }


  return (
    <div className="UPleftPanel">
      <Tilt options={{"speed": "200", "glare": "true", "max-glare": "0.2", "max": '8'}} className="UPProfile">
        <div className="ProfileImg" onMouseEnter={EditDP} onMouseLeave={EditDP}>
          <img src={base64Img} alt="Profile" loading="lazy" />
        </div>
        <div className="ProfileName">
          {user.fname} {user.lname}
        </div>
        <div className="ProfileUsername">
          @ {user.username}
          {user.isAdmin ? " (Admin)" : ""}
        </div>
        {(props.visitID==null) ? 
        <div className="ProfileEditLink">
          <Link to={`edit`}>Edit Profile</Link>
        </div>
        : null}
      </Tilt>
      <div className="UPSkills">
        <div className="UPSkillsTitle">
          Skills
        </div>
        <div className="UPSkillsContent">
          {(user.skills || []).map(displayTags)}
          <div className={((user.skills || []).length === 0)?"skillPlaceHolder":"noPlaceHolder"}>
            <Link className="editLink" to={`edit/`}>Edit profile</Link> to add your skills here...
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(UserProfileLeftPanel);
