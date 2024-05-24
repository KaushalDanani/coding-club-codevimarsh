import React, { useEffect, useState } from 'react';
import './ResourcesHome.css';
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
  const [userData,setUserData] = useState('');
  const [base64Img,setBase64Img] = useState('');

    useEffect(() => {

        (async () => {

            setIsLoading(true);
            const response = await fetch('/resources')
            const data = await response.json();
            setResources(data);


            const response2 = await fetch('/navbar/profileImg/dataset')
            const data2 = await response2.json();
            setUserData(data2.data);
            setBase64Img(`data:image/png;base64,${data2.data.profileImg}`);

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
    bgResCard()
  }

  function bgResCard() {
    let components = document.querySelectorAll('#wholeResourceCard');
    for (const ele of components) {
      if (ele.classList.contains('onDeleteResCard'))
        ele.classList.remove('onDeleteResCard');
      else
        ele.classList.add('onDeleteResCard');
    }
    resCardForEditOption()
  }

  function resCardForEditOption() {
    let components = document.querySelectorAll('#resCardForEdit');
    for(const ele of components)
    {
      if(ele.classList.contains('resCardOnEditOptionBackground'))
        ele.classList.remove('resCardOnEditOptionBackground')
      else
        ele.classList.add('resCardOnEditOptionBackground')
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
              // cssOverride={override}
              size={70}
              aria-label="Loading Spinner"
              data-testid="loader"
          />
          </div>
      </>

  return (
    <>
      <Navbar_after_login imgData={base64Img}/>
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
        {/* {resouorceGenerator(userID)} */}
          <Res_data userID={userID} source={resources} />
        </div>
      </div>
      <MyfooterAfterLogin />
    </>
  )
}