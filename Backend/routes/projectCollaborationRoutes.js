const express = require('express')
const router = express.Router()
const authentication = require("../middlewares/authentication.js")
const projectCollaborationController = require("../controller/projectCollaborationController")

router.post("/", projectCollaborationController.getAllProjectCollaboration)
router.post("/delete/pcdata", projectCollaborationController.deleteProjectCollaborationData)
router.post("/whoUploaded", authentication.auth, projectCollaborationController.getUserWhoUploaded)
router.post("/add", projectCollaborationController.addProjectCollaboration)

module.exports = router;