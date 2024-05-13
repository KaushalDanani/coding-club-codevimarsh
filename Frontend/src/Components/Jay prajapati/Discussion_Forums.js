import React from 'react'
import './Forums.css'
import Filter_bar from './Filter_bar.js'
import forumGenerator from './Discussion_data.js'
import Ask_Question from '../Question_answer_jp/Ask_Question.js'
import Navbar_after_login from '../kaushal/Navbar_after_login.js'
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import useUser from '../../store/userContext.js'
import ForumGenerator from './Discussion_data.js'
import MyfooterAfterLogin from '../MyfooterAfterLogin.js'
import HashLoader from 'react-spinners/HashLoader.js'

export default function Forums() {
	const [changeImage, setChangeImage] = useState('true');
  const [ques, setQues] = useState([]);
  const [map, setMap] = useState(new Map());
  const [isLoadingDiscussion, setIsLoadingDiscussion] = useState(false);

  useEffect(() => {
    (async () => { 
      setIsLoadingDiscussion(true);
      try {
        const response = await fetch('/discussion', {
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
      {/* <Navbar_after_login /> */}
      <div className='loadingPage'>
        <HashLoader
            color={'#ffffff'}
            loading={isLoadingDiscussion}
            // cssOverride={override}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
      </div>
    </>
 
  return (
    <>
      <Navbar_after_login />
      {/* <div className='projectHeader'>
                <div className='imageConatainer'> <img id='proj_image' src="/images/projdis3.jpg" alt='discC' /> </div>
                <h2 className='projTitle'>Discussion Forums</h2>
                <p className='project_oneliner'>The aim of argument, or of discussion, should not be victory, but progress.</p>
            </div> */}
      <div className='projectCollabrationContainer'>
      <div className='projectCollabrationHeader'>
          <div className='imageConatainer'> <img id='pc_image' src="/images/discuss2main.jpg" alt='PC' /> </div>
          <h2 className='projectTitle'>Discussion Forums</h2>
          <p className='project_collabration_oneliner'>The aim of argument, or of discussion, should not be victory, but progress.</p>
        </div>
        <div className='addProjCollab' style={{width: '85%'}}>
          <Link to={'/discussion/addQuestion'}> <button className={changeImage ? 'ProjectCollabrationBtn changeAddImage' : 'ProjectCollabrationBtn'} 
            onMouseOut={() => setChangeImage(true)}
            onMouseOver={()=> setChangeImage(false)}> Add </button> </Link>
        </div>

      {/* <Filter_bar /> */}
      {/* <Ask_Question /> */}
      {/* <Link to={'/discussion/addQuestion'}>
        <button className={changeImage ? 'AddDiscBtn changeAddImage' : 'AddDiscBtn'}
          onMouseOut={() => setChangeImage(true)}
          onMouseOver={() => setChangeImage(false)}
        > Add </button>
      </Link> */}
      <ForumGenerator questions={ques} array={map} />
      </div>
      <MyfooterAfterLogin />
    </>
  )
}
