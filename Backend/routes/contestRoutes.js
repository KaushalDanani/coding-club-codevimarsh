const express = require('express');
const router = express.Router();
const contestController = require('../controller/contestController');

router.get('/past', contestController.getPastContest);
router.get('/current', contestController.getCurrentContest);
router.get('/upcoming', contestController.getUpcomingContest);
router.post('/registerContest', contestController.registerContest);

module.exports = router;
