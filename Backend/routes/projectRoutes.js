const express = require('express');
const router = express.Router();
const projectController = require('../controller/projectController');

router.post('/', projectController.getAllProject);
router.get('/searchList', projectController.getAllProjectsTags)
router.post('/upvotes',projectController.updateUpvotes);
router.post('/addProject', projectController.addProject);
router.post('/delete', projectController.deleteProject);
router.post('/members',projectController.projectMembers);

module.exports = router;
