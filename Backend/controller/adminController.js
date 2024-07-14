const User = require('../models/user')

exports.getAdmins = async (req,res) => {
    const adminList = await User.find({isAdmin : true});
  res.send({admins : adminList});
}

exports.deleteAdmin = async(req,res) => {
    const deleteUsername = req.query.username;
  await User.findOneAndUpdate({username : deleteUsername},{isAdmin : false});
  res.send({message : `${deleteUsername} is no longer an admin!`});
}

exports.addAdmin = async(req,res) => {
    const newAdminUsername = req.query.username;
  
  const userData = await User.findOneAndUpdate({username : newAdminUsername},{isAdmin : true});
  res.send({user : userData,message : "Admin Registered successfully!"});
}