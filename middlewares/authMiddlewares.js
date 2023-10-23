const User = require('../models/userModel');
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
      const token = req.header('token');
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized",
        });
      }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
    if (!decoded) {
        return res.status(402).json({
          success: false,
          message: "You are not authorized",
        });
      }
      
    const user = await User.findOne({ _id: decoded.id.id });
    if (user) {
      req.user = user;
      next();
      
    }
    else{
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }
    } catch (err) {
      next(err);
    }
};
  
module.exports = auth;