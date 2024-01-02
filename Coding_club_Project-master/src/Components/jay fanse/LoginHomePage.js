import React, { useContext, useEffect, useState } from 'react'
import "./LoginHomePage.css";
import Myfooter from '../../Components/HomeBeforeLogin/CSS/Myfooter.css';
import Greeting from './Greeting.js';
import NewTasks from './NewTasks.js';
import NewUpdates from './NewUpdates.js';
import Navbar_after_login from '../kaushal/Navbar_after_login.js';
import useUser from '../../store/userContext.js';
import MyfooterAfterLogin from '../MyfooterAfterLogin.js';
import { useLocation } from 'react-router-dom';

function LoginHomePage(props) {

const location = useLocation();

// const searchParams = new URLSearchParams(location.search);
//   const userID = searchParams.get('userID');

  // const userID = Cookies.get("userID");
  
  const [fname,setFname] = useState("");
  const [userID, setUserID] = useState("")
  const [admin,setAdmin] = useState(false);

  const {user, setUser} = useUser();
  console.log(user, '💣💣💣💣💣💣');

  useEffect( () => {
    fetch("/home/user/dataset", {
        method: "GET",
        headers: { 
            'Content-Type': 'application/json' 
        }
    })
    .then(
      response => response.json()
    )
    .then(
      data => {
        setUser(data[0]);
        setFname(data[0].fname);
        setUserID(data[0]._id);
        setAdmin(data[0].isAdmin);
      }
    )
  },[])

  return (
    <>
    <Navbar_after_login />
    <div className='background-color-LoginHome'>
        
        <Greeting fname={fname} userID={userID} isAdmin={admin}/>
        <NewTasks userID={userID}/>
        <NewUpdates title={"Articles"} userID={userID} isArticleSelected={true}/>
        <NewUpdates title={"News"} userID={userID} isArticleSelected={false}/>
    </div>
    <MyfooterAfterLogin/>
    </>
  )
}

export default LoginHomePage;