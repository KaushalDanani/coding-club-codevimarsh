import React, { useEffect, useState } from 'react'
import "./Project_Collaboration.css";
import { Link } from 'react-router-dom';
import ProjectCollaborationCard from './ProjectCollaborationCard.js';
import Navbar_after_login from '../NavbarAfterLogin/Navbar_after_login.js';
import ToastComponent from '../Toast/toastComponent.js';
import MyfooterAfterLogin from '../FooterAfterLogin/MyfooterAfterLogin.js';
import HashLoader from 'react-spinners/HashLoader.js';
import useUser from '../../store/userContext.js';

function Project_Collaboration() {
  const { user, setUser } = useUser();

  const [isLoadingProjectCollaboration, setIsLoadingProjectCollaboration] = useState(false);
  const [changeImage, setChangeImage] = useState('true');
  const [collaborationData, setCollaborationData] = useState([]);
  const [map, setMap] = useState(new Map())
  const [base64Img,setBase64Img] = useState('');

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  
  useEffect(() => {
    if(user) {
      setBase64Img(`data:image/png;base64,${user.profileImg}`);
    }
  }, [user])

  // useEffect(() => {
  //   fetch('/projectcollaboration', {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json'
  //     }
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     // console.log(data);
  //     setCollaborationData(data[0]);
  //     // setArray(data[1]);
  //     const dataMap = new Map(data[1]);
  //     setMap(dataMap);

  //   })
  //   .catch((err) => {
  //       alert(`Error : ${err}`)
  //   })

  // }, [])

  function deleteCollabCard(key){
    const newCollabData = collaborationData.filter(collabElement => collabElement._id !== key)
    setCollaborationData(newCollabData);

    setToastVisible(false);
    setToastVisible(true);
    setToastMessage("Project Collaboration Deleted successfully!");
    setToastType("success");
    setTimeout(() => {
      setToastVisible(false)
      // window.location.reload()
    }, 4000);
  }
  useEffect(() => {
    
    (async () => {
      setIsLoadingProjectCollaboration(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/projectcollaboration`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          }
        })
        const data = await response.json();
        setCollaborationData(data[0]);
        // setArray(data[1]);
        const dataMap = new Map(data[1]);
        setMap(dataMap);
      }
      catch(err)
      {
        console.error(err, err.response);
      }
      setIsLoadingProjectCollaboration(false);
    })();
  }, [])

  if (isLoadingProjectCollaboration)
    return <>
      <div className='loadingPage'>
        <HashLoader
            color={'#ffffff'}
            loading={isLoadingProjectCollaboration}
            // cssOverride={override}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
      </div>
    </>

  function mapDataCards (collaborationData) {
    if(collaborationData.size !== 0)
    {
      return(collaborationData.map((itemData) => (
        // console.log("Helelo :  "+map.get(itemData._id))
        <ProjectCollaborationCard 
          key={itemData._id}
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

      <Navbar_after_login imgData={base64Img} />
      <div className='projectCollaborationContainer'>
        <div className='projectCollaborationHeader'>
          <div className='imageConatainer'> <img id='pc_image' src="/images/project-collab-transperant.png" alt='Project Collaboration Banner' loading="lazy" /> </div>
          <h2 className='projectTitle'>Project Collaboration</h2>
          <p className='project_collaboration_oneliner'>Talent wins games, but teamwork and intelligence win championships.</p>
        </div>
        <div className='addProjCollab' style={{width: '85%'}}>
          <Link to={'/projectcollaboration/addpost'}> <button className='ProjectCollaborationBtn' 
            onMouseOut={() => setChangeImage(true)}
            onMouseOver={()=> setChangeImage(false)}> Add </button> </Link>
        </div>

        <hr style={{width: '85%', height: '2.5px', backgroundColor: 'white', margin: '0px', marginBottom: '2.5vh'}}/>
        

        { collaborationData.length!==0 ?
            mapDataCards(collaborationData)
          :
            <div className="discussionNullContent">

              <div className="nullContentInfo">No Active projects right now :) </div>
            </div>
        }

      </div>
      <MyfooterAfterLogin />
    </>
  )
}

export default Project_Collaboration