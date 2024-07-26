const projectCollaboration = require("../models/projectCollaboration.js")
const User = require('../models/user.js');
const jwt = require('jsonwebtoken')

exports.getAllProjectCollaboration = async (req, res) => {
    const projectCollabData = await projectCollaboration.find({});
  
    let realData = new Map();
    
    for(const element of projectCollabData) {
      const realtimeData = await User.findOne({_id: element.collaborationLeader}, 'profileImg username email');
      realData.set(element._id, realtimeData);
    }
  
    const arr = Array.from(realData);
    res.status(200).send([projectCollabData, arr]);
}

exports.deleteProjectCollaborationData = async (req, res) => {
  const data = req.body;
  
  const done = await projectCollaboration.deleteOne({
   _id: data.projectCollaborationCardId
  })

  res.status(200).send();
}

exports.addProjectCollaboration = async (req, res) => {
    const data = req.body;
  
    const userData = await User.findOne({ _id: data.userID });
    const collaborationPostUsername = userData.username;
    const avtar = userData.profileImg;
    const contact = userData.email;
    const collaborationLeader = userData._id;
    const collaborationData = {
      avtar: avtar,
      ...data,
      collaborationPostUsername: collaborationPostUsername,
      contact: contact,
      collaborationLeader: collaborationLeader,
    };
    const addProjectCollab = new projectCollaboration(collaborationData);
  
    const addDone = await addProjectCollab.save();
    res.status(200).send({message : "Collaboration uploaded successfully!"});
}