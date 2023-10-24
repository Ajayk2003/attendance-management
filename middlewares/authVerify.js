const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');



const adminVerify = asyncHandler(async(req, res, next) => {
  if(req.user.role != "admin"){
    res.status(401);
    throw new Error("Access denied");
  }
  next();
});

const AuthVerify = asyncHandler(async(req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;

  if(authHeader && authHeader.startsWith('Bearer')){
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if(err){
        res.status(401);
        throw new Error("User is not authorized");
      }
      req.user = decoded.user;
      next();
    })
  }
  if(!token){
    res.status(401);
    throw new Error("Token missing");
  }
})

module.exports = { AuthVerify, adminVerify };