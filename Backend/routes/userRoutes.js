const express = require('express')
const router = express.Router()
const userController = require('../controller/userController.js')

router.get("/remove/auth", userController.removeUserAuth);
router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);

module.exports = router;