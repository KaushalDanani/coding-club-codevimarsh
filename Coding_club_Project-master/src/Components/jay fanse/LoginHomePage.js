import React, { useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import Greeting from './Greeting';
import NewTasks from './NewTasks';
import NewUpdates from './NewUpdates';
import "./LoginHomePage.css";
import Navbar_after_login from '../kaushal/Navbar_after_login';
import Myfooter from '../Myfooter';
import { useLocation } from 'react-router-dom';

function LoginHomePage(props) {

const location = useLocation();

// const searchParams = new URLSearchParams(location.search);
//   const userID = searchParams.get('userID');

  // const userID = sessionStorage.getItem('userID');
  // const userID = Cookies.get("userID");
  
  const [fname,setFname] = useState("");
  const [userID, setUserID] = useState("")
  const [admin,setAdmin] = useState(false);

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
        console.log(data);
        setFname(data[0].fname);
        setUserID(data[0]._id);
        setAdmin(data[0].isAdmin);
        sessionStorage.setItem('userID', data[0]._id);
        sessionStorage.setItem('isAdmin',data[0].isAdmin);
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
    {/* <Myfooter/> */}
    </>
  )
}

export default LoginHomePage;