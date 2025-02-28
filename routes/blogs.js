const express = require('express');

const router = express.Router();

//Import Controller
const {createComment} = require("../controllers/commentController");
const {createPost, getAllPosts, getPostById} = require("../controllers/postController");
const {likePost, unlikePost} = require("../controllers/likeController");



//Mapping Create 
router.post("/comments/create", createComment);
router.post("/posts/create", createPost);
router.get("/posts", getAllPosts);
router.get("/post/:id", getPostById);
router.post("/likes/like", likePost);
router.post("/likes/unlike", unlikePost);


//export
module.exports = router;