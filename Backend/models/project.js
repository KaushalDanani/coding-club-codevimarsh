const mongoose = require('mongoose')
const { ObjectId } = require('mongodb');

const projectSchema = new mongoose.model({

      projectName: String,
      description: String,
      tags: [],
      contributors: [ObjectId], //Array of UserCollections
      projectLink: String,
      projectInfo: String,
      image: String,
      video: String,
});

export default mongoose.model("project", projectSchema);