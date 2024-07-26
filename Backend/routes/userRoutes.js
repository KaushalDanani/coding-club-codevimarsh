const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authentication.js')
const userController = require('../controller/userController.js');

router.get('/profile',userController.getProfile);
router.post('/editSkills',userController.editSkills);
router.post('/editprofile/personal',userController.editPersonalProfile);
router.post('/editprofile/account',userController.editAccountProfile);
router.post('/checkCurrentPasswor',userController.checkCurrentPassword);
router.post('/editprofile/password',userController.editProfilePassword);
router.post('editprofile/profileImg',userController.editProfileImage);
router.get('/profile/projects',userController.profileProjects);
router.get('/home/dataset',authenticate,userController.homeDataset);
router.get("/remove/auth", userController.removeUserAuth);
router.post("/signup",userController.signUp);
router.post("/signin",userController.signIn);
// router.get("/profileImg",authenticate,userController.profileImg);

module.exports = router;