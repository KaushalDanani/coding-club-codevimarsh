const mongoose = require('mongoose')
const { ObjectId } = require('mongodb');

const replySchema = new mongoose.Schema({

      replier: ObjectId,
      description: String,
      code: String,
      upvotes: Number,
      replyDate: Date,
});

module.exports = mongoose.model("reply", replySchema);