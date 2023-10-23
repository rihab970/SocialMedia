const express = require("express");
const router = express.Router();
const {uploadImage} = require('../services/uploadFile');
const auth = require('../middlewares/authMiddlewares');
const {addPost, getAllPosts, updatePost, DeletePost} = require('../controllers/postControllers');

router.post("/add",auth, uploadImage.array("profilePic"),addPost);
router.get('/getAllPosts',auth, getAllPosts);
router.put('/edit/:id', auth,uploadImage.array("profilePic"), updatePost);
router.get('/delete/:id', auth, DeletePost);


module.exports = router;