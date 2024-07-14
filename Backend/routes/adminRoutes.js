const express = require('express');
const router = express.Router();
const adminContoller = require('../controller/adminController');

router.get('/list',adminContoller.getAdmins);
router.get('/delete',adminContoller.deleteAdmin);
router.get('/add',adminContoller.addAdmin);

module.exports = router;