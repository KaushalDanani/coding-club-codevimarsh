import React, { useState,useEffect } from "react";
import "./EditUserProfile.css";
// import dp from "../images/profile.jpeg";
import UserProfileInfo from "./UserProfileInfo";
// import { event } from "jquery";
// import Filter_bar from "../additional_codes/Filter_bar";
import UserProfileSkillTagElement from "./UserProfileSkillTagElement";
import tagCollection from "./UserProfileTagsInfo";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "react-scroll";
import useUser from "../../store/userContext";

function EditUserProfile() {
  const location = useLocation();
  const {user,setUser} = useUser();

  // const searchParams = new URLSearchParams(location.search);
  // const userID = searchParams.get('userID');

    const userID = user._id;

    const [userData,setUserData] = useState([]);
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
    const [addSkillDisplay,setaddSkillDisplay] = useState(false);
    const [usernameTitle,setUsernameTitle] = useState("");

    const [currentPass,setCurrentPass] = useState("");
    const [newPass,setNewPass] = useState("");
    const [confirmNewPass,setConfirmNewPass] = useState("");

    const [selectedTags,setSelectedTags] = useState([]);

    useEffect( () => {
      fetch(`/profile/user/?userID=${userID}`)
      .then(
        response => response.json()
      )
      .then(
        data => {
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

          console.log(base64Img);
        }
      )
    },[])


    function removeUserAuth()
    {
      (async () => {
        
        setUser(null);
      await fetch('/remove/user/auth', {
        method: "GET",
        headers: { 
          'Content-Type': 'application/json' 
        }
      })
      .then(response => response.json())
      .then(data => {
          // window.location.reload();
      });
      // window.location.reload();
      // window.location.reload();
      })()
    }
  

    function checkCurrentPassword()
    {
      const currentPwd = {
        'currentPassword' : currentPass
      }

      fetch('/check/current/password', {
        method: 'POST',
        body: JSON.stringify(currentPwd),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        if(data.message !== undefined)
          alert(data.message);
      });
    }


  const ToggleStyle = {
    display: "flex",
  };

  const EditSelectionStyle = {
    backgroundColor: "rgb(101, 5, 150)",
  };



  const [showEdit, setShowEdit] = useState(false);
  const [isEditSelected, setEditSelected] = useState({
    PersonalInfo: "true",
    AccountInfo: "false",
    CollegeInfo: "false",
    PasswordInfo: "false",
  });
  const [displayChangePassword, setDisplayChangePassword] = useState(false);

  function changeDisplayChangePassword(event) {
    setDisplayChangePassword(true);
    event.preventDefault();
  }

  function EditDP() {
    setShowEdit(!showEdit);
  }

  function changeEditSelected(name) {
    setEditSelected({
      PersonalInfo: "false",
      AccountInfo: "false",
      CollegeInfo: "false",
      PasswordInfo: "false",
      [name]: "true",
    });
    // console.log(isEditSelected);
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
    
    return <UserProfileSkillTagElement 
      tag = {tagElement}
      click = {false}
    />
  }
  
  function addAllSkillsTags(tagElement) {

    return (
      <UserProfileSkillTagElement
        userSkills={userSkills}
        tag={tagElement.name}
        use={userSkills.includes(tagElement.name)}
        id={tagElement.id}
        click = {true}
        userID = {userData._id}
        selectHandler = {onSelection}
      />
    );
  }

  function onSelection(name) {
    setSelectedTags(prev => {
      if (prev.includes(name)) {
        return prev.filter(tag => tag !== name); 
      } else {
        return [...prev, name]; 
      }
    });
    console.log('fff');
    console.log(selectedTags);
  }
  
  
  const sendDataToBackend = (data) => {
    fetch(`/editprofile/userSkills/?userID=${userID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userSkills: data }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  function saveUserProfile(event){

    const personalData = {
      fname : fname,
      lname : lname,
      about : about,
      linkedIn : linkedIn,
      leetcode : leetcode,
      codechef : codechef,
      programme : programme,
      department : department,
      year : year
    }

    fetch(`/editprofile/personal/?userID=${userID}`,{
      method : 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body : JSON.stringify(personalData)
    })
    .then(response => response.json())
    .then(data => {
      console.log("personal" , data);
      alert("Profile Updated Successfully!!")
    })
    .catch(err => {
      console.log(err);
    })
    event.preventDefault();
  }

  function saveAccount(event){
    const accountData = {
      username : username,
      email : email
    }

    fetch(`/editprofile/account/?userID=${userID}`,{
      method : 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body : JSON.stringify(accountData)
    })
    .then(response => response.json())
    .then(data => {
      if(data.error){
        alert(data.error)
        setUsername(userData.username);
        setEmail(userData.email);
      }
      else
      {
        alert(data.message);
        setUsernameTitle(username);
      }
    })
    .catch(err => {
      console.log(err);
    })


    event.preventDefault();
  }
  
  function savePassword(event){
    
    if(currentPass==newPass)
    {
      alert("New Password cannot be same as current password!");
      setConfirmNewPass("");
      setNewPass("");
    }
    else if(newPass!=confirmNewPass)
    {
      alert("Re-Enter new password!!");
      setConfirmNewPass("");
    }
    else{
      const passwordData = {
        newPass : newPass,
        'currentPassword' : currentPass
      }

      fetch('/editprofile/password',{
        method : 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body : JSON.stringify(passwordData)
      })
      .then(response => response.json())
      .then(data => {
        alert("Password updated successfully!")
        setCurrentPass("");
        setNewPass("");
        setConfirmNewPass("");
      })
    }

    event.preventDefault();
  }

  function toggleAddSkills(event){
    setaddSkillDisplay(!addSkillDisplay);
    sendDataToBackend(selectedTags);
    setUserSkills(selectedTags);

    event.preventDefault();
  }

  function programmeChangeHandler(event){
    setProgramme(event.target.value);
  }
  function departmentChangeHandler(event){
    setDepartment(event.target.value);
  }
  function yearChangeHandler(event){
    setYear(event.target.value);
  }


  // const [showEdit, setShowEdit] = useState(false);

  const handleImageChange = (id) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setBase64Img(reader.result);
        const base64String = reader.result.split(',')[1];
        console.log(base64String);
        fetch(`/editprofile/profileImg/?userID=${userID}`,{
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({profileImg : base64String})
        })
        .then(response => response.json())
        .then(data => {

          // console.log(base64String);
        })
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  // const base64Img = ;

  return (
    <div className="EditUserProfile">
      <Link to={'/profile'}> <div className="EditUserProfileBack"> </div> </Link>
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
              className="EditProfileImgChangeButton">
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

      <div className="EditProfileGrid">
      
      <div className="EditProfileSelectionPanel">
        <div
          name="ProfileInfo"
          style={
            isEditSelected.PersonalInfo == "true" ? EditSelectionStyle : null
          }
          onClick={() => {
            return changeEditSelected("PersonalInfo");
          }}
        >
          Personal Info
        </div>
        <div
          name="CollegeInfo"
          style={
            isEditSelected.CollegeInfo == "true" ? EditSelectionStyle : null
          }
          onClick={() => {
            return changeEditSelected("CollegeInfo");
          }}
        >
          College Details
        </div>
        <div
          name="AccountInfo"
          style={
            isEditSelected.AccountInfo == "true" ? EditSelectionStyle : null
          }
          onClick={() => {
            return changeEditSelected("AccountInfo");
          }}
        >
          Account
        </div>
        <div
          name="AccountInfo"
          style={
            isEditSelected.PasswordInfo == "true" ? EditSelectionStyle : null
          }
          onClick={() => {
            return changeEditSelected("PasswordInfo");
          }}
        >
          Change Password
        </div>
      </div>
      <div className="EditProfileMainPanel">
        <div
          className="EditPerosnalInfoDisplay"
          style={
            isEditSelected.PersonalInfo == "true"
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <h3>Perosnal Info</h3>
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
              <input type="text" value={linkedIn} onChange={changeLinkedIn} name="linkedIn"/>
              <span>LeetCode Profile</span>
              <span>:</span>{" "}
              <input type="text" value={leetcode} onChange={changeLeetcode} name="codechef"/>
              <span>Codechef Profile</span>
              <span>:</span>{" "}
              <input type="text" value={codechef} onChange={changeCodechef} name="leetcode"/>


              <span style={{ border: "none" }}>Skills</span>
              <span style={{ border: "none" }}>:</span>{" "}
              <div className="skillTagContainer"
              style={addSkillDisplay?{display:"none"} : {display:"flex"}}>
                {userSkills.map(addSkillTags)}
                <button className='UserProfileAddSkillTag'
                onClick={toggleAddSkills}
                >
                  Edit skills
                </button>
                </div>
                <div className="allSkillsTagContainer"
                style={addSkillDisplay?{display:"flex"} : {display:"none"}}>
                {tagCollection.map(addAllSkillsTags)}
                <button className='UserProfileAddSkillTag'
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
              <input type="text" value={username} onChange={changeUsername}/>
              <span>E-mail</span>
              <span>:</span>
              <input type="text" value={email} onChange={changeEmail}/>
              <div
                className="EditSaveButtonDiv"
                style={{ justifyContent: "space-between" }}
              >
                <button onClick={removeUserAuth}><Link to="/">Logout</Link></button>
                <button type="submit" onClick={saveAccount}>Save</button>
              </div>
            </div>
          </form>
        </div>
        <div
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
              <select
                value={programme}
                onChange={programmeChangeHandler}
              >
                <option>Bachelor's of Engineering</option>
                <option>Master's of Engineering</option>
                <option>Bachelor's of Computer Applications</option>
                <option>Master's of Computer Applications</option>
              </select>
              <span>Department</span>
              <span>:</span>
              <select
                value={department}
                onChange={departmentChangeHandler}
              >
                <option>Computer Science and Engineering</option>
                <option>Electronics and Communication Engineering</option>
                <option>Electrical Engineering</option>
              </select>
              <span>Graduation Year</span>
              <span>:</span>
              <select
              value={year}
              onChange={yearChangeHandler}
              >
                <option>"2023"</option>
                <option>"2024"</option>
                <option>"2025"</option>
                <option>"2026"</option>
              </select>
              <div className="EditSaveButtonDiv">
                <button onClick={saveUserProfile}>Save</button>
              </div>
            </div>
          </form>
        </div>
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
              <input type="text" value={currentPass} onChange={changeCurrentPass} onBlur={checkCurrentPassword} placeholder="Enter current password"/>
              <span>New Password</span>
              <span>:</span>
              <input type="text" value={newPass} onChange={changeNewPass} placeholder="Enter new password"/>
              <span>Confirm Password</span>
              <span>:</span>
              <input type="text" value={confirmNewPass} onChange={changeConfirmNewPass} placeholder="Re-enter new password"/>
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
