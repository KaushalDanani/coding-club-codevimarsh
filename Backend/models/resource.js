const mongoose = require('mongoose')
const resourceSchema = new mongoose.Schema({
    subject: String,
    logo: String,
    books: [],
    videos: [],
    notes: [],
});

module.exports = mongoose.model("resource", resourceSchema);