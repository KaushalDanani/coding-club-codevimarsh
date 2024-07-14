const mongoose = require('mongoose')
const { ObjectId } = require('mongodb');

const projectSchema = new mongoose.Schema({

      projectName: String,
      description: String,
      tags: [],
      contributors: [ObjectId], //Array of UserCollections
      projectLink: String,
      projectInfo: String,
      image: String,
      video: String,
});

module.exports = mongoose.model("project", projectSchema);