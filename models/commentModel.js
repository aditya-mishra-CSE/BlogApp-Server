//import mongoose 
const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post", //reference to the post model
    },
    user: {
        type: String,
        required: true,
    },
    body: {  //iska matlab ki kya comment kiya hai 
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Comment", commentSchema);