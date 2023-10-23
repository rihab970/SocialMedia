const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    postId:{
      type: mongoose.Schema.Types.ObjectId,
       ref: 'post', 
       required: true,
    },
    idCreator: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'user', 
       required: true,
    },
    text:{
      type: String,
      required: true,
    },
    likes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user', 
        },
      ],
    dislikes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user', 
        },
      ],
},
{
    timestamps: true,
});

const Comment = mongoose.model('comment', commentSchema);
module.exports= Comment;