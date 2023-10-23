const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
const asyncHandler = require('express-async-handler');


const addLike = asyncHandler(async (req, res) => {
    const postId = req.params.id; 
    const userId = req.user.id; 
  
    try {
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Vérifiez si l'utilisateur n'a pas déjà aimé le post
      if (!post.likes.includes(userId)) {
        // Ajoutez l'ID de l'utilisateur au tableau des likes
        post.likes.push(userId); 
        await post.save();
      }
  
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ message: 'Adding like failed' });
    }
});
const addDislike = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id; 
  
    try {
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      if (!post.dislikes.includes(userId)) {
        // Ajoutez l'ID de l'utilisateur au tableau des dislikes
        post.dislikes.push(userId); 
        await post.save();
      }
  
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ message: 'Adding dislike failed' });
    }
  });

const addLikeComment = asyncHandler(async (req, res) => {
    const commentId = req.params.id; 
    const userId = req.user.id; 
  
    try {
      const comment = await Comment.findById(commentId);
  
      if (!comment) {
        return res.status(404).json({ message: 'comment not found' });
      }
      if (!comment.likes.includes(userId)) {
        // Ajoutez l'ID de l'utilisateur au tableau des likes
        comment.likes.push(userId); 
        await comment.save();
      }
  
      return res.status(200).json(comment);
    } catch (error) {
      return res.status(500).json({ message: 'Adding like failed' });
    }
});
const addDislikeComment = asyncHandler(async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user.id; 

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'comment not found' });
    }

    if (!comment.dislikes.includes(userId)) {
      // Ajoutez l'ID de l'utilisateur au tableau des dislikes
      comment.dislikes.push(userId); 
      await comment.save();
    }

    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({ message: 'Adding dislike failed' });
  }
});

const deleteLikePost = asyncHandler(async (req, res) => {
  const postId = req.params.id; 
  const userId = req.user.id; 

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Vérifiez si l'utilisateur a précédemment aimé le post
    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((likeId) => likeId.toString() !== userId);
      await post.save();
    }

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: 'Removing like failed' });
  }
});

const getLikePost = asyncHandler(async (req, res) => {
  const postId = req.params.id; 

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const likeCount = post.likes.length;

    return res.status(200).json({ likeCount });
  } catch (error) {
    return res.status(500).json({ message: 'Fetching like count failed' });
  }
});

module.exports = {addLike, addDislike, addLikeComment, addDislikeComment, deleteLikePost, getLikePost};