import React, { useEffect, useState } from "react";
import "./ResourcesHome.css";
import Navbar_after_login from "../NavbarAfterLogin/Navbar_after_login.js";
import { Link } from "react-router-dom";
import Res_data from "./Res_data.js";
import HashLoader from "react-spinners/HashLoader.js";
import MyfooterAfterLogin from "../FooterAfterLogin/MyfooterAfterLogin.js";
import useUser from "../../store/userContext.js";

export default function Resources() {
  const { user, setUser } = useUser();

  const [isAdmin, setAdmin] = useState(false);
  const [userID, setUserID] = useState("");
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [userData, setUserData] = useState("");
  const [base64Img, setBase64Img] = useState("");

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/resources/`);
      const data = await response.json();
      setResources(data);

      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (user != null) {
      setAdmin(user.isAdmin);
      setUserID(user._id);
      setBase64Img(`data:image/png;base64,${user.profileImg}`);
    }
  }, [user]);

  function buttonSetter() {
    const elem = document.getElementById("addButton");
    if (isAdmin && elem != null) elem.style.display = "block";
  }

  function editOption() {
    let comps = document.querySelectorAll("#resdelt");
    for (const c of comps) {
      if (c.classList.contains("off")) c.classList.remove("off");
      else c.classList.add("off");
    }
    bgResCard();
  }

  function bgResCard() {
    let components = document.querySelectorAll("#wholeResourceCard");
    for (const ele of components) {
      if (ele.classList.contains("onDeleteResCard"))
        ele.classList.remove("onDeleteResCard");
      else ele.classList.add("onDeleteResCard");
    }
    resCardForEditOption();
  }

  function resCardForEditOption() {
    let components = document.querySelectorAll("#resCardForEdit");
    for (const ele of components) {
      if (ele.classList.contains("resCardOnEditOptionBackground"))
        ele.classList.remove("resCardOnEditOptionBackground");
      else ele.classList.add("resCardOnEditOptionBackground");
    }
  }

  function boolCheck() {
    if (isAdmin === true) return true;
    else return false;
  }

  if (isLoading)
    return (
      <>
        <div className="loadingPage">
          <HashLoader
            color={"#ffffff"}
            loading={isLoading}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </>
    );

  return (
    <>
      <Navbar_after_login imgData={base64Img} />
      <div>
        <nav className="navbar">
          <div className="container-fluid subject_header_line">
            <a id="heading">Select Topic to prepare</a>
            <div
              id="addButton"
              style={{ display: boolCheck() ? "block" : "none" }}
            >
              <input
                type="button"
                value={"Edit"}
                className="addSub"
                onClick={editOption}
              />
              <Link id="linkSub" to={"/addSubject"}>
                <input
                  type="button"
                  value={"Add Subject"}
                  className="addSub"
                ></input>
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {resources.length !== 0 ?
      <div className="res_card_container">
        <div id="cardgrid">
          <Res_data userID={userID} source={resources} imgData={base64Img} />
        </div>
      </div>
      :
        <div className="discussionNullContent">
          <img src="/images/profileProjects.png" alt="No Data" loading="lazy"></img>
          <div className="nullContentInfo">No Resources available right now :)
          <br />Check again later...!</div>
        
        </div>
      }
      <MyfooterAfterLogin />
    </>
  );
}
