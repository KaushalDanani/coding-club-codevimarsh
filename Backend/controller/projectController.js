const Project = require("../models/project");
const User = require("../models/user.js");

exports.getAllProject = async (req, res) => {
  try {
    Project.find({}).then((projectinfo) => {
      res.send(projectinfo);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addProject = async (req, res) => {
  try {
    const members = req.body.projectteam;
    // console.log("asd");
    var memberDataArray = [];

    for (const memUsername of members) {
      try {
        const userData = await User.find({ username: memUsername });
        if (userData) {
          memberDataArray.push(userData[0]._id);
        }

        res.send({ message: "Project uploaded successfully!" });
      } catch (error) {
        console.error(`Error fetching data for userID: ${memUsername}`, error);
        // Handle the error as needed
      }
    }
    // console.log("MemberDataArray:", memberDataArray);

    const newproject = new Project({
      projectName: req.body.projectname,
      description: req.body.projectdescription,
      tags: req.body.projecttags,
      contributors: memberDataArray, //Array of UserCollections
      projectLink: req.body.projectlink,
      projectInfo: req.body.projectinfo,
      image: req.body.projectimage,
      video: req.body.projectvideo,
    });
    await newproject.save();
    // console.log("newproj", newproject);
    res.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await Project.deleteOne({ _id: req.body.projectCollaborationCardId });

    res.send({ message: "Project deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.projectMembers = async (req, res) => {
  const members = req.body.contributors;

  const memberDataArray = [];

  for (const memberId of members) {
    try {
      const userData = await User.findById(memberId);
      if (userData) {
        memberDataArray.push(userData);
      }
    } catch (error) {
      console.error(`Error fetching data for userID: ${memberId}`, error);
    }
  }
  res.json(memberDataArray);
};
