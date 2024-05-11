import React, { useEffect, useState } from 'react';
import './Resources.css';
import Navbar_after_login from '../kaushal/Navbar_after_login.js';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import useUser from '../../store/userContext.js';
import Res_data from './Res_data.js';
import HashLoader from 'react-spinners/HashLoader.js';
import MyfooterAfterLogin from '../MyfooterAfterLogin.js';


export default function Resources(props) {

  // const location=useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const {user,setUser} = useUser();
  // const userID = user._id;
  // const isAdmin = user.isAdmin;

  const [isAdmin,setAdmin] = useState(false);
  const [userID,setUserID] = useState("");
  const [resources,setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        (async () => {

            setIsLoading(true);
            const response = await fetch('/resources')
            const data = await response.json();
            setResources(data);
            setIsLoading(false)
        })();
    }, []);


    useEffect(()=> {
      if(props.user!=null)
      {
        setAdmin(props.user.isAdmin);
        setUserID(props.user._id);
      }
    },[props.user])
 
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
  
    if (isLoading)
    return <>
        <div className='loadingPage'>
          <HashLoader
              color={'#ffffff'}
              loading={isLoading}
              // cssOverride={override}
              size={70}
              aria-label="Loading Spinner"
              data-testid="loader"
          />
          </div>
      </>

  return (
    <>
      <Navbar_after_login/>
      <div>
        <nav className="navbar">
          <div className="container-fluid subject_header_line">
            <a id='heading'>Select Topic to prepare</a>
            <div id='addButton' style={{ display: (boolCheck() ? 'block' : 'none') }}>
            <Link id='linkSub' to={'/addSubject'}><input type='button' value={"Add Subject"} className='addSub'></input></Link>
            </div>
          </div>
        </nav>
      </div>
      
      <div className="res_card_container">
        <div id='cardgrid'>
        {/* {resouorceGenerator(userID)} */}
          <Res_data userID={userID} source={resources} />
        </div>
      </div>
      <MyfooterAfterLogin />
    </>
  )
}