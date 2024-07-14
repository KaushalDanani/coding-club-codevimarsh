const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const discusionController = require('../controller/discussionController.js')

router.post('/',discusionController.getAllDiscussions)
router.get('/question',discusionController.getQuestionData)
router.post('/question',discusionController.updateUpvotes)
router.post('/addmyquestion',jsonParser,discusionController.addQuestion)
router.post('/addmyreply',jsonParser,discusionController.addReply)
router.delete('/delQue/:q_id',discusionController.deleteQuestion)
router.delete('/question/delRep/:r_id',discusionController.deleteReply)

module.exports = router