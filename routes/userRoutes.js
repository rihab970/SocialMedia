const express = require("express");
const router = express.Router();
const {registerUser, login} = require("../controllers/userControllers");


router.post("/",registerUser);
router.post("/login", login);

module.exports = router;