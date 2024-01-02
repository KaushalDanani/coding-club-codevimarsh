import React, { useEffect, useState } from 'react'
import "./Project_Collabration.css";
import { Link } from 'react-router-dom';
import ProjectCollabrationCard from './ProjectCollabrationCard.js';
import Navbar_after_login from './Navbar_after_login.js';


function Project_Collabration() {

  const [changeImage, setChangeImage] = useState('true');
  const [collabrationData, setCollabrationData] = useState([]);
  const [map, setMap] = useState(new Map())

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

  function mapDataCards (collabrationData) {
    if(collabrationData.size !== 0)
    {
      return(collabrationData.map((itemData) => (
        // console.log("Helelo :  "+map.get(itemData._id)),
        <ProjectCollabrationCard data={itemData} userDetails={map.get(itemData._id)} />
      )))
    }
  }

  return (
    <>
    <Navbar_after_login />
    <div className='projectCollabrationContainer'>
      <div className='projectCollabrationHeader'>
        <div className='imageConatainer'> <img id='pc_image' src="/images/project-collab.png" alt='PC' /> </div>
        <h2 className='projectTitle'>Project Collaboration</h2>
        <p className='project_collabration_oneliner'>Talent wins games, but teamwork and intelligence win championships.</p>
      </div>
      <div style={{width: '85%'}}>
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