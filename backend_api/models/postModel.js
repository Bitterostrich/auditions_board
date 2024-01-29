const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true,
    },

    type: {
        type: String,
        required:true,
    },

    date: {
        type: String,
        required:true,
    },
    time: {
        type: String,
        required:true,
    },

    location: {
        type: String,
        required:true,
    },
    description: {
        type: String,
        required:true,
    },






    
}, {collection: 'posts'})


module.exports = mongoose.model("Post", postSchema)