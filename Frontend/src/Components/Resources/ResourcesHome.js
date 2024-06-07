import React, { useEffect, useState } from 'react';
import './Resources.css';
import Navbar_after_login from '../kaushal/Navbar_after_login.js';
import { Link } from 'react-router-dom'
import Res_data from './Res_data.js';
import HashLoader from 'react-spinners/HashLoader.js';
import MyfooterAfterLogin from '../MyfooterAfterLogin.js';


export default function Resources(props) {
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

  function editOption() {
    let comps = document.querySelectorAll('#resdelt');
    for (const c of comps) {
      if (c.classList.contains('off'))
        c.classList.remove('off');
      else
        c.classList.add('off');
    }
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
            <input type="button" value={"Edit"} className='addSub' onClick={editOption} />
            <Link id='linkSub' to={'/addSubject'}><input type='button' value={"Add Subject"} className='addSub'></input></Link>
            </div>
          </div>
        </nav>
      </div>
      
      <div className="res_card_container">
        <div id='cardgrid'>
          <Res_data userID={userID} source={resources} />
        </div>
      </div>
      <MyfooterAfterLogin />
    </>
  )
}