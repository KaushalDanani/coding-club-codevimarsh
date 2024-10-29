const Question = require('../models/question.js')
const User = require('../models/user.js')
const Reply = require('../models/reply.js')
const { ObjectId } = require('mongodb');

exports.getAllDiscussions = async (req, resp) => {
  try {
      const userID = req.query.userID;
      let ques = await Question.find();
      let m = new Map();
  
      const Q_upvotes = await User.findOne(
        { _id: userID },
        "-_id questionUpvotes"
      ).then((obj) => {
        return obj.questionUpvotes;
      });

      for (const element of ques) {
        let U = await User.findById(element.asker, "username profileImg");
        m.set(element._id, U);
      }  
      const mArray = Array.from(m);
  
      resp.json({'ques' : ques, 'mArray' : mArray, 'qUpArray' : Q_upvotes});
    } catch (error) {
      console.log(error)
      resp.status(500).json({ error: "An error occurred" });
    }
}

exports.getQuestionData = async (req, resp) => {
    try {
      const q_id = req.query.q_id;
      const userID = req.query.userID;
      const replierMap = new Map();

      const Q_data = await Question.findById(q_id);
      
      const Asker = await User.findById(Q_data.asker, "username profileImg");
      
      const upvoteData = await User.findOne(
        { _id: userID },
        "-_id questionUpvotes repliesUpvotes"
      ).then((obj) => {
        return [obj.questionUpvotes.includes(q_id), obj.repliesUpvotes];
      });
  
      const R_data = await Reply.find({ _id: { $in: Q_data.replies } });

      for (const element of R_data) {
        let U = await User.findById(element.replier, "username profileImg");
        replierMap.set(element._id, U);
      }
      const rArr = Array.from(replierMap);
                
      resp.send([Q_data, Asker, upvoteData[0], R_data, rArr, upvoteData[1]]);
    } catch (err) {
      console.error(err);
    }
}

exports.updateUpvotes = async (req, resp) => {
  try{
    const userID = req.query.userID;
    const type = req.body.type;
    const Id = req.body.Id;
    const state = req.body.state;
    const count = req.body.count;                 
  
    if (type === "r") {
      await Reply.updateOne({ _id: Id }, { $inc: { upvotes: count } });
      await User.updateOne(
        {_id : userID},
        state 
          ? { $addToSet : {repliesUpvotes : Id}}
          : { $pull : { repliesUpvotes : Id}}
      )     
    }
  
    if (type === "q") {    
      await Question.updateOne({ _id: Id }, { $inc: { upvotes: count } });
      await User.updateOne(
        { _id: userID },
        state
          ? { $addToSet: { questionUpvotes: Id } }  // Adds `Id` only if it doesn't already exist in the array
          : { $pull: { questionUpvotes: Id } }      // Removes `Id` if it exists in the array
      );            
    }
  } catch(error){
      console.error(error)
  }
}

exports.addQuestion = function (req, res) {
  const newquestion = new Question({
    asker: new ObjectId(req.body.questionasker),
    question: req.body.questiontital,
    description: req.body.questiondescription,
    code: req.body.questioncode,
    upvotes: 0,
    askDate: new Date(),
    replies: [],
    tags: req.body.questiontags,
  });
  // // console.log(req.body);
  newquestion.save();
  res.send({message : "Question uploaded successfully!"});
}

exports.deleteQuestion = async (req, res) => {
    try {
      const q_id = req.params.q_id;
      const result = await Question.deleteOne({ _id: q_id });
  
      if (result.deletedCount === 1) {        
        return res.json({ message: 'Deleted successfully' });
      } else {        
        return res.status(404).json({ error: 'Question not found' });
      }
    } catch (error) {
      console.error('Error deleting question:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
}

exports.addReply = function (req, res) {
  const newreply = new Reply({
    replier: new ObjectId(req.body.answerreplier),
    description: req.body.answerreply,
    code: req.body.answercode,
    upvotes: 0,
    replyDate: new Date(),
  });

  newreply.save().then((data) => {
    var arr;
    // // console.log(data);
    Question.find({ _id: req.body.answerqid }).then((questioninfo) => {
      // // // console.log(questioninfo);

      arr = questioninfo[0].replies;
      arr.push(data._id);
      // // // console.log(arr);
      Question.findOneAndUpdate(
        { _id: req.body.answerqid },
        { replies: arr },
        { new: true }
      ).then((data) => {
        // // console.log(data);
      });
    });
  });
  res.send({message : "Reply added successfully!"});
}

exports.deleteReply = async (req, res) => {
    try {
      const r_id = req.params.r_id;
      const result = await Reply.deleteOne({ _id: r_id });
  
      if (result.deletedCount === 1) {        
        return res.json({ message: 'Deleted successfully' });
      } else {        
        return res.status(404).json({ error: 'reply not found' });
      }
    } catch (error) {
      console.error('Error deleting reply:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
}

