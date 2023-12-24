import React from 'react'
import './Forums.css'
import Filter_bar from './Filter_bar.js'
import forumGenerator from './Discussion_data.js'
import Ask_Question from '../Question_answer/Ask_Question.js'
import Navbar_after_login from '../kaushal/Navbar_after_login.js'
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";


export default function Forums() {
	const [changeImage, setChangeImage] = useState('true');
  
 
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
      {forumGenerator()}
    </>
  )
}
