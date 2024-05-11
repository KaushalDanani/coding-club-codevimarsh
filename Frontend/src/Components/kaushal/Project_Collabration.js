import React, { useEffect, useState } from 'react'
import "./Project_Collabration.css";
import { Link } from 'react-router-dom';
import ProjectCollabrationCard from './ProjectCollabrationCard.js';
import Navbar_after_login from './Navbar_after_login.js';
import ToastComponent from '../jay fanse/toastComponent.js';

function Project_Collabration() {

  const [changeImage, setChangeImage] = useState('true');
  const [collabrationData, setCollabrationData] = useState([]);
  const [map, setMap] = useState(new Map())

  const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");

  useEffect(() => {
    fetch('/projectcollabration', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      setCollabrationData(data[0]);
      // setArray(data[1]);
      const dataMap = new Map(data[1]);
      setMap(dataMap);

    })
    .catch((err) => {
        alert(`Error : ${err}`)
    })

  }, [])

  function deleteCollabCard(key){
    const newCollabData = collabrationData.filter(collabElement => collabElement._id !== key)
    setCollabrationData(newCollabData);

    setToastVisible(false);
    setToastVisible(true);
    setToastMessage("Project Collaboration Deleted successfully!");
    setToastType("success");
    setTimeout(() => {
      setToastVisible(false)
      // window.location.reload()
    }, 4000);
  }

  function mapDataCards (collabrationData) {
    if(collabrationData.size !== 0)
    {
      return(collabrationData.map((itemData) => (
        // console.log("Helelo :  "+map.get(itemData._id)),
        <ProjectCollabrationCard 
        id={itemData._id}
        data={itemData} userDetails={map.get(itemData._id)}
        deleteCollabCard={deleteCollabCard}
        />
      )))
    }
  }

  return (
    <>
                {toastVisible ? <ToastComponent message={toastMessage} type={toastType} /> : null}

    <Navbar_after_login />
    <div className='projectCollabrationContainer'>
      <div className='projectCollabrationHeader'>
        <div className='imageConatainer'> <img id='pc_image' src="/images/project-collab.png" alt='PC' /> </div>
        <h2 className='projectTitle'>Project Collaboration</h2>
        <p className='project_collabration_oneliner'>Talent wins games, but teamwork and intelligence win championships.</p>
      </div>
      <div className='addProjCollab' style={{width: '85%'}}>
        <Link to={'/project_collab/addpost'}> <button className={changeImage ? 'ProjectCollabrationBtn changeAddImage' : 'ProjectCollabrationBtn'} 
          onMouseOut={() => setChangeImage(true)}
          onMouseOver={()=> setChangeImage(false)}> Add </button> </Link>
      </div>

        <hr style={{width: '85%', height: '2.5px', backgroundColor: 'white', margin: '0px', marginBottom: '2.5vh'}}/>
        
        {mapDataCards(collabrationData)}

      </div>
    </>
  )
}

export default Project_Collabration