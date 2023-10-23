const express = require("express");
const router = express.Router();
const auth = require('../middlewares/authMiddlewares');
const {addLike, addDislike, addLikeComment, addDislikeComment,deleteLikePost, getLikePost} = require('../controllers/reactionControllers');

router.post('/posts/:id/like',auth, addLike);
router.post('/posts/:id/dislike', auth, addDislike);
router.post('/comments/:id/like',auth, addLikeComment);
router.post('/comments/:id/dislike', auth, addDislikeComment);
router.get('/posts/:id/deletelike', auth, deleteLikePost);
router.get('/posts/:id/getAllLikePoste', getLikePost);


module.exports = router;