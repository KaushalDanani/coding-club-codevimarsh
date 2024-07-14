const express = require('express')
const router = express.Router()

const resourceController = require('../controller/resourceController.js')

router.get('/',resourceController.getAllSubjects)
router.post('/addmysubject',resourceController.addSubject)
router.post('/addmybook',resourceController.addBook)
router.post('/addmyvideo',resourceController.addVideo)
router.post('/addmynote',resourceController.addNote)
router.delete('/delTopic/:id',resourceController.deleteSubject)
router.delete('/delBook/:sub_id',resourceController.deleteBook)
router.delete('/delVideo/:sub_id',resourceController.deleteVideo)
router.delete('/delNote/:sub_id',resourceController.deleteNote)
router.post('/rescontent',resourceController.resourceContent)

module.exports = router