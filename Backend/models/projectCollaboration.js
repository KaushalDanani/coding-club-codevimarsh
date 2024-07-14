const mongoose = require('mongoose')

const projectCollaborationSchema = new mongoose.Schema({

    avtar : {
        type : String
    },
    collaborationLeader : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    collaborationPostUsername: {
        type: String
    },
    collaborationTitle : {
        type : String
    },
    collaborationTags : [],
    collaborationDescription : {
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

module.exports = mongoose.model("projectCollaboration", projectCollaborationSchema);
