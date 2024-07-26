import React from 'react'
import './Discussion_Forums.css'
import Navbar_after_login from '../NavbarAfterLogin/Navbar_after_login.js'
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import ForumGenerator from './Discussion_data.js'
import MyfooterAfterLogin from '../FooterAfterLogin/MyfooterAfterLogin.js'
import HashLoader from 'react-spinners/HashLoader.js'
import useUser from '../../store/userContext.js';

export default function Forums() {
  const { user, setUser } = useUser();

	const [changeImage, setChangeImage] = useState('true');
  const [ques, setQues] = useState([]);
  const [map, setMap] = useState(new Map());
  const [isLoadingDiscussion, setIsLoadingDiscussion] = useState(false);
  const [userData,setUserData] = useState('');
  const [base64Img,setBase64Img] = useState('');

  useEffect(() => {
    if (user != null) {
      // setAdmin(user.isAdmin);
      setUserData(user);
      setBase64Img(`data:image/png;base64,${user.profileImg}`);
    }
  }, [user])

  useEffect(() => {
    (async () => { 
      setIsLoadingDiscussion(true);
      try {
        const response = await fetch('http://localhost:5000/discussion', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          }
        })
        const data = await response.json();
        setQues(data.ques);
        const mArray = data.mArray;
        const map = new Map(mArray);
        setMap(map);

      }
      catch(err)
      {
        console.error(err, err.response);
      }
      setIsLoadingDiscussion(false);
    })();
  }, []);

  if (isLoadingDiscussion)
    return <>
      <div className='loadingPage'>
        <HashLoader
            color={'#ffffff'}
            loading={isLoadingDiscussion}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
      </div>
    </>
 
  return (
    <>
      <Navbar_after_login imgData={base64Img} />

      <div className='projectCollaborationContainer'>
      <div className='projectCollaborationHeader'>
          <div className='imageConatainer'> <img id='pc_image' src="/images/discuss2main.jpg" alt='PC' /> </div>
          <h2 className='projectTitle'>Discussion Forums</h2>
          <p className='project_collaboration_oneliner'>The aim of argument, or of discussion, should not be victory, but progress.</p>
        </div>
        <div className='addProjCollab' style={{width: '85%'}}>
          <Link to={'/discussion/addQuestion'}> <button className={changeImage ? 'ProjectCollaborationBtn changeAddImage' : 'ProjectCollaborationBtn'} 
            onMouseOut={() => setChangeImage(true)}
            onMouseOver={()=> setChangeImage(false)}> Add </button> </Link>
        </div>
      <ForumGenerator questions={ques} array={map} />
      </div>
      <MyfooterAfterLogin />
    </>
  )
}