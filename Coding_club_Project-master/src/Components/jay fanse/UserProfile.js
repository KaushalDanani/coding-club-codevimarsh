import React, { useEffect, useState } from "react";
import UserProfileLeftPanel from "./UserProfileLeftPanel";
import "./UserProfile.css";
import UserProfileMainPanel from "./UserProfileMainPanel";
import Navbar_after_login from "../kaushal/Navbar_after_login";
import { useLocation, useNavigate } from "react-router-dom";
import MyfooterAfterLogin from "../MyfooterAfterLogin";

function UserProfile() {

  const location = useLocation();

const searchParams = new URLSearchParams(location.search);
const userID = sessionStorage.getItem('userID')
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
  },[visitID])


  function changeSearchValue(event) {
    setSearchValue(event.target.value);
  }

  return (
    <>
    <Navbar_after_login/>
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
