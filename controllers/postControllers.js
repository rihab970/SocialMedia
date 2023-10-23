const Post = require('../models/postModel');
const User = require('../models/userModel');
const Comment =require('../models/commentModel');
const asyncHandler = require('express-async-handler');


const addPost = asyncHandler(async (req, res) => {
  try {
    const { text, image } = req.body;
    const user = await User.findById(req.user.id);
    if (user) {
      const idCreator = user._id;
      const post = await Post.create({
        idCreator,
        text,
        image,
      });
      res.status(200).send(`Post is added: ${post}`); 
    }
  } catch (error) {
    res.status(400).send(`An error occurred: ${error.message}`); 
  }
});
const getAllPosts =asyncHandler(async (req, res) =>{
  try {
    const user = await User.findById(req.user.id);
    if(user){
    const posts = await Post.find();
    return res.status(200).json(posts);
    }
  } catch (error) {
    res.status(400).send(`An error occurred: ${error.message}`);
  }
});
const updatePost = asyncHandler(async (req, res) =>{
  const postId = req.params.id;
  const userId = req.user.id; 
  try {
    const post = await Post.findById(postId);
    if (post.idCreator.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to edit this post' });
    }
    const posst = await Post.findByIdAndUpdate({_id:post._id},{
      text: req.body.text,
      image: req.body.image,
    })
    if (!posst) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
        code: "0x0001",
      });
    }
    res.status(200).json({
      success: true,
      message: `Post update with success`,
   });
  } catch (error) {
    return res.status(500).json({ message: 'Editing post failed' });
  }
});
const DeletePost = asyncHandler(async (req, res)=>{
  const postId = req.params.id;
  const userId = req.user.id; 
  try {
    const post = await Post.findById(postId);
    if (post.idCreator.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to edit this post' });
    }
    if(post){
      // Find and delete all comments associated with the post
      await Comment.deleteMany({ postId: post._id });
      await Post.deleteOne({ _id: post._id });

       return res.status(200).send("Post and associated comments deleted successfully");
    }else{
      res.status(404).send("Post not found");
    }
    
  
  } catch (error) {
    return res.status(500).json({ message: 'Editing post failed' });
  }
});

module.exports = {addPost, getAllPosts, updatePost, DeletePost};