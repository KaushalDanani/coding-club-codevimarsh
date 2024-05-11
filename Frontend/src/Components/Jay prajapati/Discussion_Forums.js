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
      <Filter_bar />
      {/* <Ask_Question /> */}
      <div id='discussionbody'>
        <div className="discbanner">
          <div id='disc_header'>
            <h1>Discussion Forums</h1>
          </div>
        </div>
      </div>
      <Link to={'/discussion/addQuestion'}>
        <button className={changeImage ? 'AddDiscBtn changeAddImage' : 'AddDiscBtn'}
          onMouseOut={() => setChangeImage(true)}
          onMouseOver={() => setChangeImage(false)}
        > Add </button>
      </Link>
      <ForumGenerator questions={ques} array={map} />
      <MyfooterAfterLogin />
    </>
  )
}
