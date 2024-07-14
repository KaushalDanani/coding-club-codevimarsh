// import mongoose from "mongoose";
const mongoose = require('mongoose')
const { ObjectId } = require('mongodb');

const questionSchema = new mongoose.Schema({

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