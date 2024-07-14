const express = require('express');
const router = express.Router();
const projectController = require('../controller/projectController');

router.post('/', projectController.getAllProject);
router.post('/addProject', projectController.addProject);
router.post('/deleteProject', projectController.deleteProject);


module.exports = router;
