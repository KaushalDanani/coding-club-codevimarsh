import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import UserProfileLeftPanel from "./UserProfileLeftPanel.js";
import UserProfileMainPanel from "./UserProfileMainPanel.js";
import Navbar_after_login from "../NavbarAfterLogin/Navbar_after_login.js";
import MyfooterAfterLogin from "../FooterAfterLogin/MyfooterAfterLogin.js";
import { useLocation, useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader.js";
import useUser from "../../store/userContext.js";
import ToastComponent from "../Toast/toastComponent.js";

function UserProfile() {

  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const location = useLocation();
  const [userID, setUserID] = useState("");
  const [base64Img, setBase64Img] = useState('');
  const [searchValue, setSearchValue] = useState("");
  const [userData, setUserData] = useState([]);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  useEffect(() => {
    if (user != null) {
      setUserID(user._id);
      setBase64Img(`data:image/png;base64,${user.profileImg}`);
      setUserData(user);
    }
  }, [user])

  const searchParams = new URLSearchParams(location.search);
  const visitID = searchParams.get('visitID');

  useEffect(() => {

    (async () => {
      setIsLoadingProfile(true);
      try {
        if (visitID === null || visitID === userID) {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/profile/?userID=${userID}`)
          const data = await response.json();
          setUserData(data[0]);
        }
        else {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/profile/?userID=${visitID}`)
          const data = await response.json();
          setUserData(data[0]);
          console.log(data[0]);
        }
      }
      catch (err) {
        console.error(err, err.response);
      }
      setIsLoadingProfile(false);
    })();
  }, [visitID, userID]);


  const searchUser = async () => {
    const username = document.getElementById('searchUser').value;

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/search/?username=${username}`);
    const data = await response.json();
    if (data.userID !== undefined) {
      // alert(data.userID);
      navigate(`/profile?visitID=${data.userID}`);
    }
    else {
      setToastVisible(true);
      setToastMessage("User does not exist!");
      setToastType("error");
      setTimeout(() => {
        setToastVisible(false)
      }, 1000);
    }
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
      {toastVisible ? <ToastComponent message={toastMessage} type={toastType} /> : null}
      <Navbar_after_login imgData={base64Img} />
      <div className="userProfile">
        <div className="searchBarDiv">
          <input id='searchUser' type="text" placeholder="search username"></input>
          <button onClick={searchUser}></button>
        </div>
        <div className="UPouterFrame">
          <div>
            <UserProfileLeftPanel visitID={visitID != userID ? visitID : null} userData={userData} />
          </div>
          <div>
            <UserProfileMainPanel userData={userData} />
          </div>
        </div>
      </div>
      <MyfooterAfterLogin />
    </>
  );
}

export default UserProfile;
