const mongoose = require('mongoose')
const { ObjectId } = require('mongodb');

const imageBuffer = process.env.REACT_APP_PROFILE_IMAGE;
const base64Image = imageBuffer.toString("base64");

const userSchema = new mongoose.Schema({
    profileImg: {
        type : String,
        default : base64Image
    },

    about: String,
    skills: [],
    questionUpvotes: [ObjectId],
    repliesUpvotes: [ObjectId],  
  
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    fname: {
        type: String,
        required: true,
        uppercase: true
    },
    lname: {
        type: String,
        required: true,
        uppercase: true
    },
    year: {
        type: String,
        required: true
    },
    programme : {
        type : String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
    },
    codechef: {
        type: String,
    },
    leetcode: {
        type: String,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    isAdmin: {
        type: Boolean,
    }
})

export default mongoose.model("user", userSchema);