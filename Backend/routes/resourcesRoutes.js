const express = require('express');
const router = express.Router();
const resourcesController = require('../controller/resourcesController');

router.post('/book/add',resourcesController.addBook);
router.post('/video/add',resourcesController.addVideo);
router.post('/note/add',resourcesController.addNote);
router.post('/book/delete/:sub_id',resourcesController.delBook);
router.post('/video/delete/:sub_id',resourcesController.delVideo);
router.post('/note/delete/:sub_id',resourcesController.delNote);

module.exports = router;