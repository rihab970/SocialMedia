const express = require("express");
const router = express.Router();
const auth = require('../middlewares/authMiddlewares');
const {addComment, getAllcommentForPost, deleteComment, updateComment} = require("../controllers/commentControllers");

router.post('/add/:id',auth, addComment);
router.get('/getAll/:id',getAllcommentForPost);
router.get('/delete/:id', deleteComment);
router.put('/edit/:id', auth, updateComment);



module.exports = router;