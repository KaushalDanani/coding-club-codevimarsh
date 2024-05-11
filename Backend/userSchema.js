const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const fs = require('fs');
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken')

const imageBuffer = fs.readFileSync("D:/code_minions-web/Frontend/public/images/profile.jpeg");
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

userSchema.pre("save", async function (next) {
    if(this.isModified("password"))
    {
        this.password = await bcrypt.hash(this.password, 10);
        // console.log(`Now, Password is : ${this.password}`);
    }
    next();
})


userSchema.pre(["updateOne", "findByIdAndUpdate", "findOneAndUpdate"], async function (next) {
    console.log("Middleware triggered");

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
        const tk = jwt.sign({_id:this._id.toString()}, "ourprojectisoncodingwebtocreatecodingculture");
        this.tokens = this.tokens.concat({token: tk});
        await this.save();
        // console.log(tk);

        return tk;
    } catch (err) {
        res.send("The error is "+err)
        console.log(err)
    }
}

const User = mongoose.model("users", userSchema)

module.exports = User;