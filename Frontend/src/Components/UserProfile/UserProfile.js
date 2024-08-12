import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import UserProfileLeftPanel from "./UserProfileLeftPanel.js";
import UserProfileMainPanel from "./UserProfileMainPanel.js";
import Navbar_after_login from "../NavbarAfterLogin/Navbar_after_login.js";
import MyfooterAfterLogin from "../FooterAfterLogin/MyfooterAfterLogin.js";
import { useLocation } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader.js";
import useUser from "../../store/userContext.js";

function UserProfile(props) {
  
  const { user, setUser } = useUser();
  
  const location = useLocation();
  const [userID,setUserID] = useState("");
  const [base64Img,setBase64Img] = useState('');
  const [searchValue, setSearchValue] = useState("");
  const [userData,setUserData] = useState([]);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  useEffect(() => {
    if(user!=null)
    {
      setUserID(user._id);
      setBase64Img(`data:image/png;base64,${user.profileImg}`);
      setUserData(user);
    }
  },[user])

  const searchParams = new URLSearchParams(location.search);
  const visitID = searchParams.get('visitID');

  useEffect( () => {

    (async () => {
      setIsLoadingProfile(true);
      try {
        if(visitID===null || visitID===userID)
        {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/profile/?userID=${userID}`)
          const data = await response.json();
          setUserData(data[0]);
        }
        else
        {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/profile/?userID=${visitID}`)
          const data = await response.json();
          setUserData(data[0]);
        }
      }
      catch(err)
      {
        console.error(err, err.response);
      }
      setIsLoadingProfile(false);
    })();
  },[visitID,userID]);


  function changeSearchValue(event) {
    setSearchValue(event.target.value);
  }

  if (isLoadingProfile)
    return <>
      <div className='loadingPage'>
        <HashLoader
            color={'#ffffff'}
            loading={isLoadingProfile}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
      </div>
    </>

  return (
    <>
    <Navbar_after_login imgData={base64Img} />
    <div className="userProfile">
      
      <div className="UPouterFrame">
        <div>
          <UserProfileLeftPanel userData={userData} visitID={visitID!=userID ? visitID : null}/>
        </div>
        <div>
          <UserProfileMainPanel userData={userData}/>
        </div>
      </div>
    </div>
    <MyfooterAfterLogin/>
    </>
  );
}

export default UserProfile;
