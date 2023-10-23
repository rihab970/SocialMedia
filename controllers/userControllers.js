const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
require('dotenv').config();


const registerUser = asyncHandler(async (req, res) => {
    const { email, password, name, dateOfBirth,confirmpassword} = req.body;
     //verification si tous les inputs non vide 
    if (!name || !email || !dateOfBirth || !password || !confirmpassword){
        return res.status(403).json({
          success: false,
          message: "Not all fields have been entered",
          code: "0x0001",
         });
    }
    // verification syntaxe l'email
    if (!validateEmail(email)){
        return res.status(401).json({
          success: false,
          message: "Invalid email.",
          code: "0x0002",
        });
    }
    // verification syntaxe de password
    if (!isPasswordValid(password)){
        return res.status(401).json({
          success: false,
          message: "Invalid password format.",
          code: "0x0003",
        });
    }
    if (password !== confirmpassword)
        return res.status(405).json({
          success: false,
          message: "Password must be identical",
          code: "0x0005",
        });
    const user = await User.create({
        email,
        password, 
        name, 
        dateOfBirth,
    });
    if (user){
        res.status(201).json({
            _id: user._id,
            email: user.email,
            password: user.password,
            name: user.name,
            dateOfBirth: user.dateOfBirth,
            token: generateToken(user._id),
        });
    } else{
            res.status(400);
            throw new Error('Eroor Occured!'); 
    }
    
});

const login = asyncHandler(async (req, res) => { 
    try{
      const { email, password } = req.body;
      const user = await User.findOne({email});
  
        if (!validateEmail(email)){
            return res.status(400).json({
                success: false,
                message: "Invalid email",
                code: "0x0002",
            });
        }
        if (!isPasswordValid(password)){
            return res.status(401).json({
              success: false,
              message: "Invalid password format.",
              code: "0x0003",
            });
        }
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not registred",
                code: "0x0013",
            });
        }
    const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
         return res.status(402).json({
             success: false,
             message: "Password is incorrect",
            code: "0x0014",
         });
        }
    const access_token = generateToken({ id: user._id });
      return res.status(200).json({access_token, user});

    } catch (error) {
      return res.status(500).json({ msg: error.message, code: "0x0006" });
    }
});


function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function isPasswordValid(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    return passwordRegex.test(password);
}

module.exports = { registerUser, login};