import React, { useState, useEffect } from "react";
import "./EditUserProfile.css";
import UserProfileSkillTagElement from "../UserProfile/UserProfileSkillTagElement.js";
import tagCollection from "../UserProfile/UserProfileTagsInfo.js";
import useUser from "../../store/userContext.js";
import { Link } from "react-router-dom";
import ToastComponent from "../Toast/toastComponent.js";
import HashLoader from "react-spinners/HashLoader.js";

function EditUserProfile() {
  
  const { user, setUser } = useUser();

  // useState()
  const [showhide, setShowhide] = useState("true");
  const [showhideforconfirm, setShowhideforconfirm] = useState("true");
  const [showhideforreconfirm, setShowhideforreconfirm] = useState("true");
  const [userID, setUserID] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [isLoadingEditProfile, setIsLoadingEditProfile] = useState(false);
  const [userData, setUserData] = useState([]);
  const [base64Img, setBase64Img] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [about, setAbout] = useState("");
  const [userSkills, setUserSkills] = useState([]);
  const [linkedIn, setLinkedin] = useState("");
  const [leetcode, setLeetcode] = useState("");
  const [codechef, setCodechef] = useState("");
  const [programme, setProgramme] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [addSkillDisplay, setaddSkillDisplay] = useState(false);
  const [usernameTitle, setUsernameTitle] = useState("");
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [isEditSelected, setEditSelected] = useState({
    PersonalInfo: "true",
    AccountInfo: "false",
    PasswordInfo: "false",
  });

  // useEffect()
  useEffect(() => {
    if (user != null) {
      setUserID(user._id);
    }
  }, [user]);

  useEffect(() => {
    (async () => {
      setIsLoadingEditProfile(true);
      try {
        const response = await fetch(`http://localhost:5000/user/profile?userID=${userID}`);
        const data = await response.json();
        setUserData(data[0]);
        setBase64Img(`data:image/png;base64,${data[0].profileImg}`);
        setFname(data[0].fname);
        setLname(data[0].lname);
        setAbout(data[0].about);
        setLinkedin(data[0].linkedIn);
        setLeetcode(data[0].leetcode);
        setCodechef(data[0].codechef);
        setProgramme(data[0].programme);
        setDepartment(data[0].department);
        setYear(data[0].year);
        setUserSkills(data[0].skills);
        setSelectedTags(data[0].skills);
        setUsername(data[0].username);
        setUsernameTitle(data[0].username);
        setEmail(data[0].email);
      } catch (err) {
        console.error(err, err.response);
      }
      setIsLoadingEditProfile(false);
    })();
  }, [userID]);


  // Utility functions

  const changeEditSection = (active) => {
    document.getElementById("personalInfo").checked = false;
    document.getElementById("account").checked = false;
    document.getElementById("changePassword").checked = false;
    document.getElementById(active).checked = true;
  }

  const currentPasswordVisibilityHandler = (e) => {
    setShowhide(!showhide);

    let x = document.getElementById("editprofile_currentpass");
    if (showhide) x.type = "text";
    else x.type = "password";
  };

  const confirmPasswordVisibilityHandler = (e) => {
    setShowhideforconfirm(!showhideforconfirm);

    let x = document.getElementById("editprofile_newpass");
    if (showhideforconfirm) x.type = "text";
    else x.type = "password";
  };

  const reConfirmPasswordVisibilityHandler = (e) => {
    setShowhideforreconfirm(!showhideforreconfirm);

    let x = document.getElementById("editprofile_newpass_conf");
    if (showhideforreconfirm) x.type = "text";
    else x.type = "password";
  };

  
  const removeUserAuth = () => {
    (async () => {
      setUser(null);
      await fetch("http://localhost:5000/user/remove/auth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
        });
    })();
  }

  const ToggleStyle = {
    display: "flex",
  };

  const EditSelectionStyle = {
    backgroundColor: "rgb(253,138,22)",
    color: "black",
    fontWeight: 500,
  };

  
  const EditDP = () => {
    setShowEdit(!showEdit);
  }

  const changeEditSelected = (name) => {
    setEditSelected({
      PersonalInfo: "false",
      AccountInfo: "false",
      PasswordInfo: "false",
      [name]: "true",
    });
  }

  function changeFName(event) {
    setFname(event.target.value);
  }
  function changeLName(event) {
    setLname(event.target.value);
  }
  function changeAbout(event) {
    setAbout(event.target.value);
  }
  function changeLinkedIn(event) {
    setLinkedin(event.target.value);
  }
  function changeLeetcode(event) {
    setLeetcode(event.target.value);
  }
  function changeCodechef(event) {
    setCodechef(event.target.value);
  }
  function changeUsername(event) {
    setUsername(event.target.value);
  }
  function changeEmail(event) {
    setEmail(event.target.value);
  }
  function changeCurrentPass(event) {
    setCurrentPass(event.target.value);
  }
  function changeNewPass(event) {
    setNewPass(event.target.value);
  }
  function changeConfirmNewPass(event) {
    setConfirmNewPass(event.target.value);
  }

  function addSkillTags(tagElement) {
    return <UserProfileSkillTagElement tag={tagElement} click={false} />;
  }

  function addAllSkillsTags(tagElement) {
    return (
      <UserProfileSkillTagElement
        isEditting={true}
        userSkills={userSkills}
        tag={tagElement.name}
        use={userSkills.includes(tagElement.name)}
        id={tagElement.id}
        click={true}
        userID={userData._id}
        selectHandler={onSelection}
      />
    );
  }
  function onSelection(name) {
    setSelectedTags((prev) => {
      if (prev.includes(name)) {
        return prev.filter((tag) => tag !== name);
      } else {
        return [...prev, name];
      }
    });
  }

  const sendDataToBackend = (data) => {
    fetch(`http://localhost:5000/user/editSkills/?userID=${userID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userSkills: data }),
    })
      .then((response) => response.json())
      .then((data) => {
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  function saveUserProfile(event) {
    const personalData = {
      fname: fname,
      lname: lname,
      about: about,
      linkedin: linkedIn,
      leetcode: leetcode,
      codechef: codechef,
      programme: programme,
      department: department,
      year: year,
    };

    fetch(`http://localhost:5000/user/editprofile/personal/?userID=${userID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(personalData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("personal", data);

        setToastVisible(true);
        setToastMessage("Profile Updated Successfully!!");
        setToastType("success");

        setTimeout(() => setToastVisible(false), 3000);
      })
      .catch((err) => {
        console.log(err);
      });
    event.preventDefault();
  }

  function saveAccount(event) {
    const accountData = {
      username: username,
      email: email,
    };

    fetch(`http://localhost:5000/user/editprofile/account/?userID=${userID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accountData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setToastVisible(true);
          setToastMessage(data.error);
          setToastType("warning");
          setTimeout(() => setToastVisible(false), 3000);

          setUsername(userData.username);
          setEmail(userData.email);
        } else {
          setToastVisible(true);
          setToastMessage(data.message);
          setToastType("success");
          setTimeout(() => setToastVisible(false), 3000);
          setUsernameTitle(username);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    event.preventDefault();
  }

  async function savePassword(event) {
    event.preventDefault();

    const currentPwd = {
      currentPassword: currentPass,
    };

    const response = await fetch("http://localhost:5000/user/checkCurrentPassword", {
      method: "POST",
      body: JSON.stringify(currentPwd),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (data.message !== "") {
      setToastVisible(true);
      setToastMessage("Wrong password");
      setToastType("warning");
      setTimeout(() => setToastVisible(false), 3000);
    } else if (currentPass == newPass) {
      setToastVisible(true);
      setToastMessage("New Password cannot be same as current password!");
      setToastType("warning");
      setTimeout(() => setToastVisible(false), 3000);

      setConfirmNewPass("");
      setNewPass("");
    } else if (newPass.length < 8 || confirmNewPass.length < 8) {
      setToastVisible(true);
      setToastMessage("Please, keep your password minimum 8 character!!");
      setToastType("warning");
      setTimeout(() => setToastVisible(false), 3000);

      setNewPass("");
      setConfirmNewPass("");
    } else if (newPass != confirmNewPass) {
      setToastVisible(true);
      setToastMessage("Re-Enter new password!!");
      setToastType("warning");
      setTimeout(() => setToastVisible(false), 3000);

      setConfirmNewPass("");
    } else {
      const passwordData = {
        newPass: newPass,
        currentPassword: currentPass,
      };

      fetch(`http://localhost:5000/user/editprofile/password/?userID=${userID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwordData),
      })
        .then((response) => response.json())
        .then((data) => {
          setToastVisible(true);
          setToastMessage("Password updated successfully!");
          setToastType("success");
          setTimeout(() => setToastVisible(false), 3000);

          setCurrentPass("");
          setNewPass("");
          setConfirmNewPass("");
        });
    }
  }

  function toggleAddSkills(event) {
    setaddSkillDisplay(!addSkillDisplay);
    sendDataToBackend(selectedTags);
    setUserSkills(selectedTags);

    if (addSkillDisplay === true) {
      setToastVisible(true);
      setToastMessage("Skills Updated Successfully!!");
      setToastType("success");
      setTimeout(() => setToastVisible(false), 3000);
    }

    event.preventDefault();
  }

  function programmeChangeHandler(event) {
    setProgramme(event.target.value);
  }
  function departmentChangeHandler(event) {
    setDepartment(event.target.value);
  }
  function yearChangeHandler(event) {
    setYear(event.target.value);
  }

  const handleImageChange = (id) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setBase64Img(reader.result);
        const base64String = reader.result.split(",")[1];
        console.log(base64String);
        fetch(`http://localhost:5000/user/editprofile/profileImg/?userID=${userID}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ profileImg: base64String }),
        })
          .then((response) => response.json())
          .then((data) => {
            setToastVisible(true);
            setToastMessage(data.message);
            setToastType("success");
            setTimeout(() => {
              setToastVisible(false);
            }, 4000);
          });
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  
  // display Section
  // Page should be loaded after all the data from database has been fetched
  if (isLoadingEditProfile)
    return (
      <>
        <div className="loadingPage">
          <HashLoader
            color={"#ffffff"}
            loading={isLoadingEditProfile}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </>
    );

  return (
    <div className="EditUserProfile">
      {toastVisible ? (
        <ToastComponent message={toastMessage} type={toastType} />
      ) : null}

      <Link to={"/profile"}>
        {" "}
        <div className="EditUserProfileBack"> </div>{" "}
      </Link>
      <div className="EditProfilePhotoPanel">
        <div
          className="EditProfileImg"
          onMouseEnter={EditDP}
          onMouseLeave={EditDP}
        >
          <img src={base64Img} id="dp" className="EditProfileImg" />
          <div
            className="EditProfileImgChange"
            id="editDP"
            style={showEdit ? ToggleStyle : null}
          >
            <button
              onClick={() => handleImageChange("dp")}
              className="EditProfileImgChangeButton"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="EditProfileUsernameDisplay">@{usernameTitle}</div>
      </div>

      {/* Edit profile Vertical Menu */}
      <div className="EditProfileGrid">
        <div className="EditProfileSelectionPanel">
          <input
            type="radio"
            name="slider"
            id="personalInfo"
            onClick={() => {
              changeEditSection("personalInfo");
            }}
            defaultChecked
          />
          {/* <input
            type="radio"
            name="slider"
            id="collegeDetails"
            onClick={() => {
              changeEditSection("collegeDetails");
            }}
          /> */}
          <input
            type="radio"
            name="slider"
            id="account"
            onClick={() => {
              changeEditSection("account");
            }}
          />
          <input
            type="radio"
            name="slider"
            id="changePassword"
            onClick={() => {
              changeEditSection("changePassword");
            }}
          />
          
          <label htmlFor="personalInfo" className="personalInfo" onClick={() => {
            return changeEditSelected("PersonalInfo");
          }}>
            <span>Personal Info</span>
          </label>
          {/* <label htmlFor="collegeDetails" className="collegeDetails" onClick={() => {
            return changeEditSelected("CollegeInfo");
          }}>
            <span>College Details</span>
          </label> */}
          <label htmlFor="account" className="account" onClick={() => {
            return changeEditSelected("AccountInfo");
          }}>
            <span>Account</span>
          </label>
          <label htmlFor="changePassword" className="changePassword" onClick={() => {
            return changeEditSelected("PasswordInfo");
          }}>
            <span>Change Password</span>
          </label>

          <div className="slider2"></div>
        </div>


        {/* Profile Info Display */}
        <div className="EditProfileMainPanel">

          {/* Personal Info Section */}
          <div
            className="EditPerosnalInfoDisplay"
            style={
              isEditSelected.PersonalInfo == "true"
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <h3>Perosnal Information</h3>
            <form>
              <div className="EditFormFrame">
                <span>First Name</span>
                <span>:</span>
                <input
                  name="fname"
                  id="fname"
                  type="text"
                  placeholder="First Name here"
                  value={fname}
                  onChange={changeFName}
                  required
                />
                <span>Last Name</span>
                <span>:</span>{" "}
                <input
                  name="lname"
                  type="text"
                  value={lname}
                  onChange={changeLName}
                  required
                />
                <span>About</span>
                <span>:</span>{" "}
                <textarea
                  name="about"
                  id=""
                  cols="15"
                  rows="6"
                  value={about}
                  onChange={changeAbout}
                  required
                ></textarea>
                <span>LinkedIn Profile</span>
                <span>:</span>{" "}
                <input
                  type="text"
                  value={linkedIn}
                  onChange={changeLinkedIn}
                  name="linkedIn"
                />
                <span>LeetCode Profile</span>
                <span>:</span>{" "}
                <input
                  type="text"
                  value={leetcode}
                  onChange={changeLeetcode}
                  name="codechef"
                />
                <span>Codechef Profile</span>
                <span>:</span>{" "}
                <input
                  type="text"
                  value={codechef}
                  onChange={changeCodechef}
                  name="leetcode"
                />
                <span style={{ border: "none" }}>Skills</span>
                <span style={{ border: "none" }}>:</span>{" "}
                <div
                  className="skillTagContainer"
                  style={
                    addSkillDisplay ? { display: "none" } : { display: "flex" }
                  }
                >
                  {userSkills.map(addSkillTags)}
                  <button
                    className="UserProfileAddSkillTag"
                    onClick={toggleAddSkills}
                  >
                    Edit skills
                  </button>
                </div>
                <div
                  className="allSkillsTagContainer"
                  style={
                    addSkillDisplay ? { display: "flex" } : { display: "none" }
                  }
                >
                  {tagCollection.map(addAllSkillsTags)}
                  <button
                    className="UserProfileAddSkillTag"
                    onClick={toggleAddSkills}
                  >
                    Done
                  </button>
                </div>
                <div className="EditSaveButtonDiv">
                  <button onClick={saveUserProfile}>Save</button>
                </div>
              </div>
            </form>
          </div>

          {/* Account Info Section */}
          <div
            className="EditAccountInfoDisplay"
            style={
              isEditSelected.AccountInfo == "true"
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <h3>Account</h3>
            <form action="">
              <div className="EditFormFrame">
                <span>Username</span>
                <span>:</span>
                <input type="text" value={username} onChange={changeUsername} />
                <span>E-mail</span>
                <span>:</span>
                <input type="text" value={email} onChange={changeEmail} />
                <div
                  className="EditSaveButtonDiv"
                  style={{ justifyContent: "space-between" }}
                >
                  <Link to="/">
                    <button onClick={removeUserAuth}>Logout</button>
                  </Link>
                  <button type="submit" onClick={saveAccount}>
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* College Info Section */}
          {/* <div
            className="EditCollegeInfoDisplay"
            style={
              isEditSelected.CollegeInfo == "true"
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <h3>College Details</h3>
            <form action="">
              <div className="EditFormFrame">
                <span>Programme</span>
                <span>:</span>
                <select value={programme} onChange={programmeChangeHandler}>
                  <option>Bachelor's of Engineering</option>
                  <option>Master's of Engineering</option>
                  <option>Bachelor's of Computer Applications</option>
                  <option>Master's of Computer Applications</option>
                </select>
                <span>Department</span>
                <span>:</span>
                <select value={department} onChange={departmentChangeHandler}>
                  <option>Computer Science and Engineering</option>
                  <option>Electronics and Communication Engineering</option>
                  <option>Electrical Engineering</option>
                </select>
                <span>Graduation Year</span>
                <span>:</span>
                <select value={year} onChange={yearChangeHandler}>
                  <option>2023</option>
                  <option>2024</option>
                  <option>2025</option>
                  <option>2026</option>
                </select>
                <div className="EditSaveButtonDiv">
                  <button onClick={saveUserProfile}>Save</button>
                </div>
              </div>
            </form>
          </div> */}

          {/* Change Password Section */}
          <div
            style={
              isEditSelected.PasswordInfo == "true"
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <h3>Change Password</h3>
            <form action="">
              <div className="EditFormFrame">
                <span>Current Password</span>
                <span>:</span>
                <div
                  id="pwd_icon"
                  className={
                    showhide ? "show_pwd_edit_profile" : "hide_pwd_edit_profile"
                  }
                  onClick={currentPasswordVisibilityHandler}
                ></div>
                <input
                  type="password"
                  value={currentPass}
                  id="editprofile_currentpass"
                  onChange={changeCurrentPass}
                  placeholder="Enter current password"
                />
                <span>New Password</span>
                <span>:</span>
                <div
                  id="confirmPwd_icon"
                  className={
                    showhideforconfirm
                      ? "show_pwd_edit_profile"
                      : "hide_pwd_edit_profile"
                  }
                  onClick={confirmPasswordVisibilityHandler}
                />
                <input
                  type="password"
                  value={newPass}
                  id="editprofile_newpass"
                  onChange={changeNewPass}
                  placeholder="Enter new password"
                />
                <span>Confirm Password</span>
                <span>:</span>
                <div
                  id="reconfirmPwd_icon"
                  className={
                    showhideforreconfirm
                      ? "show_pwd_edit_profile"
                      : "hide_pwd_edit_profile"
                  }
                  onClick={reConfirmPasswordVisibilityHandler}
                />
                <input
                  type="password"
                  value={confirmNewPass}
                  id="editprofile_newpass_conf"
                  onChange={changeConfirmNewPass}
                  placeholder="Re-enter new password"
                />
                <div className="EditSaveButtonDiv">
                  <button onClick={savePassword}>Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUserProfile;
