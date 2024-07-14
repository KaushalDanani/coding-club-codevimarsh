const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/profile',userController.getProfile);
router.post('/editSkills',userController.editSkills);
router.post('/editprofile/personal',userController.editPersonalProfile);
router.post('/editprofile/account',userController.editAccountProfile);
router.post('/checkCurrentPasswor',userController.checkCurrentPassword);
router.post('/editprofile/password',userController.editProfilePassword);
router.post('editprofile/profileImg',userController.editProfileImage);
router.get('/profile/projects',userController.profileProjects);
router.get('/home/dataset',userController.homeDataset);
router.get("/remove/auth", userController.removeUserAuth);
router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);

module.exports = router;