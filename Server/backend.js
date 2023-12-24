const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { ObjectId } = require("mongodb");


const app = express();
const port = 5000;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/CodingClubDB", {
  useNewUrlParser: true,
});

const resourcesSchema = mongoose.Schema({
    subject: String,
    logo: String,
    books: [],
    videos: [],
    notes: [],
  });
  
const resModel = mongoose.model("Resource", resourcesSchema);

const userSchema = mongoose.Schema({
  profileImg: String,
  fname: String,
  lname: String,
  username: String,
  about: String,
  linkedIn: String,
  leetcode : String,
  codechef : String,
  programme: String,
  department: String,
  year: Number,
  email: String,
  password: String,
  skills: [],
  questionUpvotes: [ObjectId],
  repliesUpvotes: [ObjectId],
});

const userModel = mongoose.model("User",userSchema);

const projectSchema = mongoose.Schema({
  projectName : String,
  description : String,
  tags : String,
  contributors : [ObjectId], //Array of UserCollections 
  projectLink : String,
  projectInfo : String,
  image : String,
  video : String
});

const projectModel = mongoose.model("Project",projectSchema);

const contestSchema = mongoose.Schema({
  name : String,
  type : String,
  startDate : Date,
  contestLink : String,
  resultLink : String,
  solutionLink : String,
  time : String,  
  type1 : String
});

const contestModel = mongoose.model('Contest', contestSchema);

app.get("/loginHome/contests", async(req,res) => {
  const contestData = await contestModel.find({type : "upcoming"});
  res.send(contestData);
})


app.get("/resources/rescontent",async (req,res) => {
    
    try {
        const resData = await resModel.find({});
        res.send(resData);
      } catch (err) {
        res.status(500).send(err.message);
      }
})

app.get("/home/user", async (req,res) => {
    const userID = req.query.userID;
    try {
      const resData = await userModel.find({_id : userID});
      res.send(resData);
    } catch (err) {
      res.status(500).send(err.message);
    }
});

app.get("/profile/user", async (req,res) => {
    const userID = req.query.userID;
    try {
      const resData = await userModel.find({_id : userID});
      res.send(resData);
    } catch (err) {
      res.status(500).send(err.message);
    }
});

app.get("/profile/projects", async(req,res) => {
  const userID = req.query.userID;
  // console.log(userID);

  const projData = await projectModel.find({ contributors : {$in : [userID] }});
  res.send(projData);  

});

app.post("/profile/projects/members", async(req,res) => {

  const members = req.body.contributors;

  const memberDataArray = [];

  for (const memberId of members) {
    try {
      const userData = await userModel.findById(memberId);
      if (userData) {
        memberDataArray.push(userData);
      }
    } catch (error) {
      console.error(`Error fetching data for userID: ${memberId}`, error);
      // Handle the error as needed
    }
  }

  res.send(memberDataArray);
})


app.get("/signin/home", async (req,res) => {
  try {
    const userData = await userModel.find({username : "ghijkl2", password:"abc123"});
    res.send(userData);
  } catch (err) {
    res.status(500).send(err.message);
  }
})

app.get("/editSkillTags/", async (req,res) => {
  const userID = req.query.userID;
  try {
    const resData = await userModel.find({_id : userID});
    res.send(resData);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/editprofile/userSkills", async (req,res) => {
  const skills = req.body.userSkills;
  const userID = req.query.userID;

  try{
  const user = await userModel.findOne({_id : userID});
  user.skills = skills;
  
  await user.save();
  res.send(user)
  }
  catch(err)
  {
    console.log(err);
  }

})

app.post("/editprofile/personal", async(req,res) => {
  const personalData = req.body;
  const userID = req.query.userID;
  console.log(userID);

  let user = await userModel.findOne({_id : userID});
  console.log(user);
  user = {
    ...user._doc,
    ...personalData,
  };

  await userModel.findOneAndUpdate({ _id: userID }, user, {
    new: true,
    runValidators: true,
  });

  console.log(user);
  res.send(personalData);
})

app.post("/editprofile/account", async(req,res) => {
  const accountData = req.body;
  const userID = req.query.userID;  

  const existingData = await userModel.findOne({
    $and: [
      { _id: { $ne: userID } }, // Not the current user
      { $or: [{ username: accountData.username }, { email: accountData.email }] }, // Match either the username or the email
    ]
  });

  // If there is a match, handle the validation error
  if (existingData) {
    return res.status(400).json({ error: "Username or email already exists!" }); // You can handle the error as you prefer
  }

  const updatedData = await userModel.updateOne(
    {_id : userID},
    {
      username : accountData.username,
      email : accountData.email
    }
  )
  return res.status(200).json({ message: "Account details updated successfully!!" });
  
})

app.post("/editprofile/password", async(req,res) => {
  const newPass = req.body.newPass;
  const userID = req.query.userID;

  const updatedData = await userModel.updateOne(
    {_id : userID},
    {password : newPass}
  )

  res.send(updatedData);
})

app.post("/editprofile/profileImg", async(req,res) => {
  const profileImg = req.body.profileImg;
  const userID = req.query.userID;

  // console.log(profileImg);
  // console.log(userID);
  
  const updatedUser = await userModel.updateOne(
    {_id : userID},
    {profileImg : profileImg}
  )

  console.log(updatedUser);
  res.send(req.body);
})

app.listen(port, () => {
    console.log(`Server started on ${port}`);
})