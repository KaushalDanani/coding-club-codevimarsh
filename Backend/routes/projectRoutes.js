const express = require('express');
const router = express.Router();
const projectController = require('../controller/projectController');

router.post('/', projectController.getAllProject);
router.post('/addProject', projectController.addProject);
router.post('/delete', projectController.deleteProject);
router.post('/members',projectController.projectMembers);

module.exports = router;
