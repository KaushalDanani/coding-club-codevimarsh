const User = require("../models/user.js")
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const auth = async (req, res, next) => {
    const token = req.cookies.jwtAuth;
     
  if (!token) {
    return res.json({ message: 'Access denied. No token provided.' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.REACT_APP_SECRET_TOKEN_KEY);
    req.user = await User.findById(decoded._id);
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = auth;