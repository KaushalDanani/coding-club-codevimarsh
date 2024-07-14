const mongoose = require('mongoose')

const projectCollabrationSchema = new mongoose.Schema({

    avtar : {
        type : String
    },
    collabrationLeader : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    collabrationPostUsername: {
        type: String
    },
    collabrationTitle : {
        type : String
    },
    collabrationTags : [],
    collabrationDescription : {
        type : String
    },
    contact : {
        type : String
    },
    date : {
        type : Date,
        default : Date.now
    }

})

module.exports = mongoose.model("projectCollabration", projectCollabrationSchema);