const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    idCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        required: true,
    },
    text:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
        default:
            "uploads/anonymous-avatar-icon-25.jpg",
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
const Post= mongoose.model('post', postSchema);
module.exports= Post;