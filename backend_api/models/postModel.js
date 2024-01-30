const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    postTitle: {
        type: String,
        required:true,
    },

    postType: {
        type: String,
        required:true,
    },

    postDate: {
        type: Date,
        required:true,
    },
    
    postTime: {
        type: String,
        required:true,
    },

    postLocation: {
        type: String,
        required:true,
    },
    postDescription: {
        type: String,
        required:true,
    },
   






    
}, {collection: 'posts'})


module.exports = mongoose.model("Post", postSchema)