const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const fs = require('fs');
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const userSchema = new mongoose.Schema({
    prn: {
        type: Number,
        required: true
    },
    profileImg: {
        type : String,
        default : null
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
    enrollmentYear: {
        type: String,
        required: true
    },
    programme : {
        type : String,
        required: true
    },
    branchName: {
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
    token: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
    }
})

userSchema.pre("save", async function (next) {
    if(this.isModified("password"))
    {
        this.password = await bcrypt.hash(this.password, 10);
        // console.log(`Now, Password is : ${this.password}`);
    }
    next();
})


userSchema.pre(["updateOne", "findByIdAndUpdate", "findOneAndUpdate"], async function (next) {
    // console.log("Middleware triggered");

    const data = this.getUpdate();
    
    // Check if password is being modified
    if (data.password) {

        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Update the password in the update document
        data.password = hashedPassword;
    }
    // Call next to proceed with the operation
    next();
});


userSchema.methods.generateAuthToken = async function() {
    try {
        const token = jwt.sign({_id:this._id.toString(), email:this.email}, process.env.REACT_APP_SECRET_TOKEN_KEY);

        this.token = token;
        await this.save();
        // console.log(tk);

        return token;
    } catch (err) {
        // res.send("The error is "+err)
        console.log(err)
    }
}

const User = mongoose.model("users", userSchema)
module.exports = User;