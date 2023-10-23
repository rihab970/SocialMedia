const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
const asyncHandler = require('express-async-handler');


const addComment = asyncHandler(async (req, res) => {
  const postId = req.params.id; 
  const idCreator = req.user.id; 
  const {text }= req.body;
  try {
    const post = await Post.findById(postId);

    if (post) {
        const comment = await Comment.create({
            postId,
            idCreator,
            text,
          });
        res.status(200).send(`comment is added: ${comment}`); 
    }else{
        return res.status(404).json({ message: 'Post not found' });
    }

  } catch (error) {
    res.status(400).send(`An error occurred: ${error.message}`); 
  }
});

const getAllcommentForPost = asyncHandler(async (req, res) =>{
    const postId = req.params.id; 
    try {
        const post = await Post.findById(postId);
        if (post) {
            const comments = await Comment.find({ postId: postId })
            return res.status(200).json(comments);
        }else{
            return res.status(404).json({ message: 'Post not found' });
        }
    
      } catch (error) {
        res.status(400).send(`An error occurred: ${error.message}`); 
      }
});

const deleteComment = asyncHandler(async (req,res) =>{
    const commentId = req.params.id; 
   try{
    const comment = await Comment.findById(commentId);
     if(comment){
        await Comment.deleteOne({_id: req.params.id})
        res.status(200).send("comment deleted successfully");
     }else {
        res.status(404).send("Comment not found");
      }

   }catch (error) {
        res.status(400).send(`An error occurred: ${error.message}`); 
    }
});
const updateComment = asyncHandler(async (req, res)=> {
    const commentId = req.params.id; 
    const idCreator = req.user.id;
    try{
     const comment = await Comment.findByIdAndUpdate({_id:commentId, idCreator:idCreator},{
        text: req.body.text,
      })
      if (!comment) {
        return res.status(404).json({
          success: false,
          message: "comment not found",
          code: "0x0001",
        });
      }
      res.status(200).json({
        success: true,
        message: `comment update with success`,
     });
    }catch (error) {
         res.status(400).send(`An error occurred: ${error.message}`); 
     }
});

module.exports = { addComment, getAllcommentForPost, deleteComment, updateComment };
