const User = require('../models/user.js')
const bcrypt = require("bcryptjs");
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

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