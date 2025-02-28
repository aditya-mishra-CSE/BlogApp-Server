const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

//route handler or business Logic
exports.createComment = async (req, res) => {
  try {
    //fetch data from request body
    const { post, user, body } = req.body;


    //By using save method
    //create a comment object
    // const comment = new Comment({
    //   post,
    //   user,
    //   body,
    // });

    // //save the new comment into the database
    // const savedComment = await comment.save();

    //By using create method
    const savedComment = await Comment.create({post,user,body});

    //find the post by ID, add the newcomment to its comments array
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: savedComment._id } },
      { new: true }
    )
      .populate("comments") // populate the comments array with comment documents
      .exec();

    //iska matlab hai ki post ki id se Post ka object fetch karke lao yeh findById ka kaam ho gaya ab Update wala
    //kaam karna hai matlab hum comments wale array par is nayi id ko insert karna chahte hai
    //new:true ka matlab hai ki sara kaam hone par jo updated document hai woh mujhe return karna

    //populate se yeh hota hai ki matlab abhi humare paas comment ki id's pdi hai aur hume poora document chahiye jo bhi id se
    //relate karta hai matlab ki populate krenge toh comment ayegnge wrna uski id ayengi

    //matlab given id ke liye post exist hi nahi karta 
    if (!updatedPost) {
        return res.status(404).json({ error: "Post not found" });
    }

    res.json({
      post: updatedPost,
    });
    }
    
    catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
