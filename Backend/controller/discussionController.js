const Question = require('../models/question.js')
const User = require('../models/user.js')
const Reply = require('../models/reply.js')

exports.getAllDiscussions = async (req, resp) => {
    try {
      let ques = await Question.find();
      let m = new Map();
  
      for (const element of ques) {
        let U = await User.findById(element.asker, "username profileImg");
        m.set(element._id, U);
      }
        
      const mArray = Array.from(m);
  
      resp.json({'ques' : ques, 'mArray' : mArray});
    } catch (error) {
      resp.status(500).json({ error: "An error occurred" });
    }
}

exports.getQuestionData = async (req, resp) => {
    try {
      const q_id = req.query.q_id;
      const userID = req.query.userID;
  
      const replierMap = new Map();
      const upvoteMap = new Map();
              
  
      const Q_data = await Question.findById(q_id);
      const Asker = await User.findById(Q_data.asker, "username profileImg");
      const Q_upvote = await User.findOne(
        { _id: userID },
        "-_id questionUpvotes"
      ).then((obj) => {
        return obj.questionUpvotes.includes(q_id);
      });
  
      const R_data = await Reply.find({ _id: { $in: Q_data.replies } });
      const R_upvotes = await User.findOne(
        { _id: userID },
        "-_id repliesUpvotes"
      ).then((obj) => {
        return obj.repliesUpvotes;
      });
      for (const element of R_data) {
        let bool = R_upvotes.includes(element._id);
        upvoteMap.set(element._id, bool);
      }
      const uArr = Array.from(upvoteMap);
  
      for (const element of R_data) {
        let U = await User.findById(element.replier, "username profileImg");
        replierMap.set(element._id, U);
      }
      const rArr = Array.from(replierMap);
              
  
      resp.send([Q_data, Asker, Q_upvote, R_data, rArr, uArr]);
    } catch (err) {
      console.error(err);
    }
}

exports.updateUpvotes = async (req, resp) => {
    const userID = req.query.userID;
    const type = req.body.type;
    const Id = req.body.Id;
    const state = req.body.state;
    const count = req.body.count;                
  
    const ur = await User.findById(userID, "-_id repliesUpvotes").then(
      (resp) => {
        return resp.repliesUpvotes;
    });
    const uq = await User.findById(userID, "-_id questionUpvotes").then(
      (resp) => {
        return resp.questionUpvotes;
      }
    );
  
    if (type === "r") {
      const updated = await Reply.updateOne({ _id: Id }, { upvotes: count });      
      if (state) {
        ur.push(Id);
      } else {        
        let ind = ur.indexOf(Id);
        ur.splice(ind, 1);        
      }
      const UserUps = await User.updateOne(
        { _id: userID },
        { repliesUpvotes: ur }
      );      
    }
  
    if (type === "q") {      
      const updated = await Question.updateOne({ _id: Id }, { upvotes: count });      
      if (state) {
        uq.push(Id);        
      } else {                
        let ind = uq.indexOf(Id);
        uq.splice(ind, 1);        
      }
      const UserUps = await User.updateOne(
        { _id: userID },
        { questionUpvotes: uq }
      );      
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
  const newreply = new Resplie({
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

