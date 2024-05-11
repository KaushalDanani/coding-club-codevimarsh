import React, { useState,useEffect } from 'react'
import "./UserProfileSkillTagElement.css"

function UserProfileSkillTagElement(props) {


  const [isTagSelected, setTagSelected] = useState(props.use);
  const [userSkillSet,setUserSkillSet] = useState(props.userSkills)
  
  useEffect(() => {

    setUserSkillSet(props.userSkills);
    setTagSelected(props.use);

  }, [props.use,props.userSkills]);

  // // console.log("DD");
  // // console.log(userSkillSet);

  const selectedTagStyle = {
    backgroundColor : "rgb(255,139,22)",
    color: "black"
  }

  // const notSelectedTagStyle = {
  //   backgroundColor : "rgba(0,0,0,0.4)",
  //   color: "white"
  // }

  const toggleTagSelection = () => {

    props.selectHandler(props.tag);
    setTagSelected(!isTagSelected);

    // fetch(`/editSkillTags/?userID=${props.userID}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     setUserSkillSet(data[0].skills);
    //     // console.log("fetched")
    //     // console.log(userSkillSet);
    //   });


    // if (isTagSelected) {
    //   const updatedSkillSet = userSkillSet.filter(skill => skill !== props.tag);
    //   setUserSkillSet(updatedSkillSet);
    //   setTagSelected(false);
    //   sendDataToBackend(updatedSkillSet);
    //   } else {
    //   const updatedSkillSet = [...userSkillSet, props.tag];
    //   setUserSkillSet(updatedSkillSet);
    //   setTagSelected(true);
    //   sendDataToBackend(updatedSkillSet);    
    //   }
  };

  


  return (
    <div className='UserProfileSkillTag'
    style={isTagSelected ? selectedTagStyle : null}
    >
    <label htmlFor={props.id}
    
    onClick={props.click ? toggleTagSelection : null}
    >
      {props.tag}
    </label>
    <input 
    type='checkbox' 
    hidden
    className='UserProfileSkillTagCheckbox' 
    value={props.tag}
    id={props.id}
    />
    </div>
    // </input>
  )
}

export default UserProfileSkillTagElement