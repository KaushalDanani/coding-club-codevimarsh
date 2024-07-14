const User = require('../models/user.js')
const bcrypt = require("bcryptjs");
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

exports.getProfile = async (req,res) => {
    const userID = req.query.userID;
  try {
    const resData = await User.find({ _id: userID });
    res.send(resData);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

exports.editSkills = async (req,res) => {
    const skills = req.body.userSkills;
  const userID = req.query.userID;

  try {
    const user = await User.findOne({ _id: userID });
    user.skills = skills;

    await user.save();
    res.send(user);
  } catch (err) {
    // console.log(err);
  }
}

exports.editPersonalProfile = async (req,res) => {
    const personalData = req.body;
  const userID = req.query.userID;
  // // console.log(userID);

  let user = await User.findOne({ _id: userID });
  // // console.log(user);
  user = {
    ...user._doc,
    ...personalData,
  };

  await User.findOneAndUpdate({ _id: userID }, user, {
    new: true,
    runValidators: true,
  });

  // // console.log(user);
  res.send(personalData);
}

exports.editAccountProfile = async (req,res) => {
    const accountData = req.body;
  const userID = req.query.userID;

  const existingData = await User.findOne({
    $and: [
      { _id: { $ne: userID } }, // Not the current user
      {
        $or: [{ username: accountData.username }, { email: accountData.email }],
      }, // Match either the username or the email
    ],
  });

  // If there is a match, handle the validation error
  if (existingData) {
    return res.status(400).json({ error: "Username or email already exists!" }); // You can handle the error as you prefer
  }

  const updatedData = await User.updateOne(
    { _id: userID },
    {
      username: accountData.username,
      email: accountData.email,
    }
  );
  return res
    .status(200)
    .json({ message: "Account details updated successfully!!" });
}

exports.checkCurrentPassword = async (req,res) => {
    try {
        const jwt = req.cookies.jwtAuth;
        const userDetail = await User.findOne({'tokens.token': jwt});
      
        const currentPwd = req.body.currentPassword;
        const isSame = await bcrypt.compare(currentPwd, userDetail.password);
        
        console.log(isSame);
      
        if(!isSame)
          res.send({message: "Wrong Current Password..."});
        else
          res.send({message : ""});
      }
      catch(err)
      {
        res.status(500).send({ message: "Server Error, Please try some time later..." });
      }
}

exports.editProfilePassword = async (req,res) => {
    try {
        const newPass = req.body.newPass;
        const userID = req.query.userID;
    
    
        const updatedUser = await User.findOneAndUpdate(
          { _id: userID },
          { password: newPass }
        );
    
        res.send({message : "Updated successfully!"});
      } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).send("Error updating password");
      }
}

exports.editProfileImage = async (req,res) => {
    const profileImg = req.body.profileImg;
  const userID = req.query.userID;

  // // console.log(profileImg);
  // // console.log(userID);

  const updatedUser = await User.updateOne(
    { _id: userID },
    { profileImg: profileImg }

  );

  // console.log(updatedUser);
  res.send({body : req.body,message : "Profile image updated sucessfully!"});

}

exports.profileProjects = async (req,res) => {
  const userID = req.query.userID;
  const projData = await Project.find({ contributors: { $in: [userID] } });
  res.send(projData);
}

exports.homeDataset = async (req,res) => {
  const jwt = req.cookies.jwtAuth;
  try {
    const resData = await User.find({'token' : jwt});
    res.send(resData);
  } catch (err) {
    res.status(500).send(err.message);
  }
}


exports.removeUserAuth = async (req, res) => {
    res.cookie("jwtAuth", '', { expires: new Date(0) });
    res.redirect('/');
}

exports.signUp = async (req, res) => {
    try {
        const userData = req.body;
    
        const existingData = await User.findOne({
            $and: [
                { $or: [{ prn: userData.prn },{username: userData.username}] }
            ]
        });
    
        if (existingData) {
            res.status(400).send({ error: "Username or email already exists!" });
        } else {
          
          const vidhyarthiUserData = {
            PRN: req.body.prn,
            Password: req.body.password
          }
      
          const url = process.env.REACT_APP_MSU_VIDHYARTHI_SIGNUP;
          const response = await axios.post(url,vidhyarthiUserData);
      
          const data = response.data.obj[0];
          const base64Image = await urlToBase64(process.env.REACT_APP_PROFILE_IMAGE);
          const name = data.NameAsPerMarksheet.split(" ");
          
          const user = new User({
            prn: userData.prn,
            profileImg: base64Image,
            email: data.EmailId,
            username: userData.username,
            password: userData.password,
            fname: name[0],
            lname: name[2],
            enrollmentYear: data.EnrollmentYear,
            programme: data.ProgrammeName,
            branchName: data.BranchName,
            linkedin: userData.linkedin,
            codechef: userData.codechef,
            leetcode: userData.leetcode,
            isAdmin: false
          })
    
    
            const token = await user.generateAuthToken();
    
            res.cookie("jwtAuth", token, {
              expires: new Date(Date.now() + 31536000), 
              httpOnly: true
            });
    
            const signup_done = await user.save();
            
    
            res.status(200).send({ userID: signup_done._id });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Internal Server Error" });
    }
}

exports.signIn = async (req, res) => {

    try {
        const loginData = req.body;
  
        const userDetail = await User.findOne({username: loginData.username});
        if(userDetail == null)
        {
          res.send({message: "Invalid User Credential"})
        }
        else
        {
          const isSame = await bcrypt.compare(loginData.password, userDetail.password);
  
          if(!isSame)
            res.send({message: "Invalid User Credential"});
          else
          {
            const token = await userDetail.generateAuthToken();
  
            res.cookie("jwtAuth", token, {
              expires: new Date(Date.now() + 31536000),
              httpOnly: true
            })
  
            res.status(200).send({ userID: userDetail._id });
          }
        }
    } catch (err) {
        res.sendStatus(400)
    }
}