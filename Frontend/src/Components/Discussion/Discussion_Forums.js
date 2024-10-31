import React from 'react'
import './Discussion_Forums.css'
import Navbar_after_login from '../NavbarAfterLogin/Navbar_after_login.js'
import { useEffect, useState } from "react";
import ForumGenerator from './ForumGenerator.js'
import useUser from '../../store/userContext.js';
import Myfooter from '../Footer/Myfooter.js';

export default function Forums() {
  const { user, setUser } = useUser();

  const [base64Img,setBase64Img] = useState('');

  useEffect(() => {
    if (user != null) {
      setBase64Img(`data:image/png;base64,${user.profileImg}`);
    }
  }, [user])
 
  return (
    <>
      <Navbar_after_login imgData={base64Img} />

      <div className='projectCollaborationContainer'>
      <div className='projectCollaborationHeader'>
          <div className='imageConatainer'> 
            <img id='pc_image' src="/images/discuss2main-transperant.png" alt='Discussion Banner' loading="lazy" /> 
          </div>
          <h2 className='projectTitle'>Discussion Forums</h2>
          <p className='project_collaboration_oneliner'>The aim of argument, or of discussion, should not be victory, but progress.</p>
      </div>
      
      <ForumGenerator />
    </div>
    
    <Myfooter />
  </>
  )
}