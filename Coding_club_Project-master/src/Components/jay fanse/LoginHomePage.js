import React, { useContext, useEffect, useState } from 'react'
import Greeting from './Greeting';
import NewTasks from './NewTasks';
import NewUpdates from './NewUpdates';
import "./LoginHomePage.css";
import Navbar_after_login from '../kaushal/Navbar_after_login';
import Myfooter from '../Myfooter';
import { useLocation } from 'react-router-dom';
import MyfooterAfterLogin from '../MyfooterAfterLogin';

function LoginHomePage(props) {

const location = useLocation();

// const searchParams = new URLSearchParams(location.search);
//   const userID = searchParams.get('userID');

  const userID = sessionStorage.getItem('userID');

  const [fname,setFname] = useState("");
  const [isAdmin,setAdmin] = useState(false);

  useEffect( () => {
    fetch(`home/user/?userID=${userID}`)
    .then(
      response => response.json()
    )
    .then(
      data => {
        console.log(data);
        setFname(data[0].fname);
        setAdmin(data[0].isAdmin);
      }
    )
  },[])

  return (
    <>
    <Navbar_after_login />
    <div className='background-color-LoginHome'>
        
        <Greeting fname={fname} userID={userID} isAdmin={isAdmin}/>
        <NewTasks userID={userID}/>
        <NewUpdates title={"Articles"} userID={userID} isArticleSelected={true}/>
        <NewUpdates title={"News"} userID={userID} isArticleSelected={false}/>
    </div>
    <MyfooterAfterLogin/>
    </>
  )
}

export default LoginHomePage;