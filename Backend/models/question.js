import mongoose from "mongoose";
const { ObjectId } = require('mongodb');

const questionSchema = new mongoose.model({

      asker: ObjectId,
      question: String,
      description: String,
      code: String,
      upvotes: Number,
      askDate: Date,
      replies: [],
      tags: [],
});

module.exports = mongoose.model("question", questionSchema);