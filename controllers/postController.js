//import the model
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const Like = require("../models/likeModel");


//Business logic

exports.createPost = async(req,res) => {
    try{
        const {title, body} = req.body;
        const post = new Post({
            title, body,
        })
        const savedPost = await post.save();
        res.json({
            post:savedPost,
        })

    }
    catch(err)
    {
        return res.status(400)
        .json({
            error:"Error while creating Post",
        });
    }
};

exports.getAllPosts = async(req, res) => {
    try{
        //fetch all Posts items from the database
        const posts = await Post.find({}).populate("comments").populate("likes").exec();
        
        //response
        res.status(200)
        .json({
            success: true,
            data: posts,
            message: "Entire posts data is fetched"
        });
    }
    catch(error)
    {
        res.status(500)
        .json({
            success:false,
            error:error.message,
            messsage:"Server Error"
        });
    }
}

exports.getPostById = async(req, res) => {
    try{
        const {id} = req.params;
        const post = await Post.findById( {_id:id}).populate("comments").populate("likes").exec();

        if(!post){
            return res.status(404)
                   .json({
                    success: false,
                    message: "No Data Found with Given ID",
                   })
        }

        res.status(200)
        .json({
            success:true,
            data:post,
            message: `Post ${id} data successfully fetched`,
        })
    }
    catch(err)
    {
        res.status(500)
        .json({
            success:false,
            error:err.message,
            message:"server Error",
        });
    }
}