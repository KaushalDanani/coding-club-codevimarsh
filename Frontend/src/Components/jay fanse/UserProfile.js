import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import UserProfileLeftPanel from "./UserProfileLeftPanel.js";
import UserProfileMainPanel from "./UserProfileMainPanel.js";
import Navbar_after_login from "../kaushal/Navbar_after_login.js";
import MyfooterAfterLogin from "../MyfooterAfterLogin.js";
import useUser, { UserProvider } from "../../store/userContext.js";
import { useLocation, useNavigate } from "react-router-dom";

function UserProfile(props) {

  const location = useLocation();
  // const {user, setUser} = useUser();
  const [userID,setUserID] = useState("");

  useEffect( () => {
    if(props.user!=null)
    {
      setUserID(props.user._id);
    }
  },[props.user])

const searchParams = new URLSearchParams(location.search);
  // const userID = user._id;
   
  const visitID = searchParams.get('visitID');
  console.log('visit',visitID);

  const [searchValue, setSearchValue] = useState("");
  const [userData,setUserData] = useState([]);

  useEffect( () => {

    {visitID===null || visitID===userID ? 
    fetch(`/profile/user/?userID=${userID}`)
    .then(
      response => response.json()
    )
    .then(
      data => {
        setUserData(data[0]);
      }
    )
    :
    fetch(`/profile/user/?userID=${visitID}`)
    .then(
      response => response.json()
    )
    .then(
      data => {
        setUserData(data[0]);
      }
    )
    }
  },[visitID,userID])


  function changeSearchValue(event) {
    setSearchValue(event.target.value);
  }

  return (
    <>
    <Navbar_after_login/>
    {/* {console.log(user,"💣💣")} */}
    <div className="userProfile">
      {/* <div className="searchProfile">
        <input
          type="text"
          value={searchValue}
          placeholder="search username"
          onChange={changeSearchValue}
          
        />
        <button>search</button>
      </div> */}
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
