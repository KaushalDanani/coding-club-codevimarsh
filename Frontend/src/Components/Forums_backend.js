const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const { ObjectId } = require('mongodb');
const app = express();
app.use(bodyparser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with the origin of your client-side app
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

mongoose.connect("mongodb://127.0.0.1:27017/CodingClubDB", {
  useNewUrlParser: true,
});

const forumSchema = mongoose.Schema({
  asker: ObjectId,
  question: String,
  description: String,
  code: String,
  upvotes: Number,
  askDate: Date,
  replies: [],
  tags: []
});

const userSchema = mongoose.Schema({
  profileImg: String,
  fname: String,
  lname: String,
  username: String,
  about: String,
  linkedIn: String,
  programme: String,
  department: String,
  year: Number,
  email: String,
  password: String,
  skills: [],
  questionUpvotes: [],
  repliesUpvotes: []
})

const replySchema = mongoose.Schema({
  replier: ObjectId,
  description: String,
  code: String,
  upvotes: Number,
  replyDate: Date
})

const resSchema = mongoose.Schema({
  subject: String,
  logo: String,
  books: [],
  videos: [],
  notes: []
});

const Question = mongoose.model('questions', forumSchema);
const Resplie = mongoose.model('replies', replySchema);
const User = mongoose.model('users', userSchema);
const resModel = mongoose.model('resources', resSchema);




app.get('/resources', async (req, resp) => {
  let docs = await resModel.find();
  docs.forEach(element => {
    element.books = element.books.length;
    element.videos = element.videos.length;
    element.notes = element.notes.length;
  });
  resp.send(docs);
});

// app.post('/resources/content', (req, resp) => {
//   const data = req.body;
//   console.log(data);
// })



app.get('/asker', async (req, resp) => {
  const asker_id = req.query.askerId;
  const user = await User.findById(asker_id, '_id profileImg username');
  resp.send(user);
})


app.get('/discussion', async (req, resp) => {
  try {

    let ques = await Question.find();
    let m = new Map();

    for (const element of ques) {
      let U = await User.findById(element.asker, 'username profileImg');
      m.set(element._id, U);
    }

    // Convert the Map to an array of key-value pairs
    const mArray = Array.from(m);

    resp.send([ques, mArray]);
  } catch (error) {
    resp.status(500).json({ error: 'An error occurred' });
  }
});


app.get('/discussion/question', async (req, resp) => {
  try {
    const q_id = req.query.q_id;
    const userID = req.query.userID;

    const replierMap = new Map();
    const upvoteMap = new Map();

    console.log(q_id);
    console.log(userID);

    const Q_data = await Question.findById(q_id);
    const Asker = await User.findById(Q_data.asker, 'username profileImg');
    const Q_upvote = await User.findOne({ _id: userID }, '-_id questionUpvotes').then((obj) => {
      return obj.questionUpvotes.includes(q_id);
    });

    const R_data = await Resplie.find({ _id: { $in: Q_data.replies } });
    const R_upvotes = await User.findOne({ _id: userID }, '-_id repliesUpvotes').then((obj) => {
      return obj.repliesUpvotes;
    });
    for (const element of R_data) {
      let bool = R_upvotes.includes(element._id);
      upvoteMap.set(element._id, bool);
    }
    const uArr = Array.from(upvoteMap);

    for (const element of R_data) {
      let U = await User.findById(element.replier, 'username profileImg');
      replierMap.set(element._id, U);
    }
    const rArr = Array.from(replierMap);

    // console.log(Q_upvote);
    // console.log(uArr);

    resp.send([Q_data, Asker, Q_upvote, R_data, rArr, uArr]);

  } catch (err) {
    console.error(err);
  }
})

app.post('/discussion/question', async (req, resp) => {
  const userID = req.query.userID;
  const type = req.body.type;
  const Id = req.body.Id;
  const state = req.body.state;
  const count = req.body.count;
  console.log("THis :" + count);
  console.log(state);
  // const Id = req.body.Id;
  // const count = req.body.count;

  const ur = await User.findById(userID, '-_id repliesUpvotes').then((resp) => {
    return resp.repliesUpvotes
  });
  const uq = await User.findById(userID, '-_id questionUpvotes').then((resp) => {
    return resp.questionUpvotes
  });

  if (type === 'r') {
    const updated = await Resplie.updateOne({ _id: Id }, { upvotes: count });
    console.log(updated)
    if (state) {
      ur.push(Id);
    }
    else {
      console.log("Before : " + ur);
      let ind = ur.indexOf(Id);
      ur.splice(ind, 1);
      console.log("After : " + ur);
    }
    const UserUps = await User.updateOne({ _id: userID }, { repliesUpvotes: ur });
    console.log("user upvote data changed for replies : " + UserUps);
  }

  if (type === 'q') {
    console.log(Id);
    const updated = await Question.updateOne({ _id: Id }, { upvotes: count });
    console.log(updated)
    if (state) {
      uq.push(Id);
      console.log("Here in if");
    }
    else {
      console.log("Here in else");
      console.log("Before : " + uq);
      let ind = uq.indexOf(Id);
      uq.splice(ind, 1);
      console.log("After : " + uq);
    }
    const UserUps = await User.updateOne({ _id: userID }, { questionUpvotes: uq });
    console.log("user upvote data changed for replies : " + UserUps);
  }
})



app.listen(5000, () => {
  console.log("server running!!");
})