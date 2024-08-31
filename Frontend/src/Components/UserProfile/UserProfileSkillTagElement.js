import React, { useState,useEffect } from 'react'
import "./UserProfileSkillTagElement.css"

function UserProfileSkillTagElement(props) {

  const [isTagSelected, setTagSelected] = useState(props.use);
  const [userSkillSet,setUserSkillSet] = useState(props.userSkills)
  
  useEffect(() => {

    setUserSkillSet(props.userSkills);
    setTagSelected(props.use);

  }, [props.use,props.userSkills]);

  
  const selectedTagStyle = {
    backgroundColor : "rgb(255,139,22)",
    color: "black"
  }


  const toggleTagSelection = () => {

    props.selectHandler(props.tag);
    setTagSelected(!isTagSelected);


  };


  return (
    <div className={props.isEditting ? 'UserProfileEditSkillTag' : 'UserProfileSkillTag'}
        style={isTagSelected ? selectedTagStyle : null}>
      
      <label htmlFor={props.id}
        onClick={props.click ? toggleTagSelection : null}>
        {props.tag}
      </label>

      <input type='checkbox' 
      hidden
      className='UserProfileSkillTagCheckbox' 
      value={props.tag}
      id={props.id} />
    </div>
  )
}

export default React.memo(UserProfileSkillTagElement);