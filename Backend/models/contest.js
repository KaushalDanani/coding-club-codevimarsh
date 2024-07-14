const mongoose = require('mongoose')

const contestSchema = new mongoose.Schema({
    name: String,
    type: String,
    startDate: Date,
    endDate: Date,
    contestLink: String,
    resultLink: String,
    solutionLink: String,
  });

  module.exports = mongoose.model("contest", contestSchema);