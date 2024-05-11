import React, { useEffect, useState } from 'react';
import './Resources.css';
import resouorceGenerator from './Res_data.js';
import Navbar_after_login from '../kaushal/Navbar_after_login.js';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import useUser from '../../store/userContext.js';



export default function Resources(props) {

  // const location=useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const {user,setUser} = useUser();
  // const userID = user._id;
  // const isAdmin = user.isAdmin;

  const [isAdmin,setAdmin] = useState(false);
  const [userID,setUserID] = useState("");

  useEffect( ()=> {
    if(props.user!=null)
    {
      setAdmin(props.user.isAdmin);
      setUserID(props.user._id);
    }
  },[props.user])

  console.log(isAdmin)
  function buttonSetter(){
    const elem = document.getElementById('addButton');
    if(isAdmin && elem!=null)
    elem.style.display = 'block'
  }

  function boolCheck(){
    if(isAdmin === true)
      return true;
    else
      return false;
  }

  return (
    <>
      <Navbar_after_login/>
      <div >
        <nav className="navbar">
          <div className="container-fluid">
            <a id='heading'>Select Topic to prepare</a>
            <div id='addButton' style={{ display: (boolCheck() ? 'block' : 'none') }}>
            <Link id='linkSub' to={'/addSubject'}><input type='button' value={"Add Subject"} className='addSub'></input></Link>
            </div>
          </div>
        </nav>
      </div>
      
      <div id='cardgrid'>
    
      {resouorceGenerator(userID)}
      
      </div>
    </>
  )
}