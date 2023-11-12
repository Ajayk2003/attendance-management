const md5 = require('md5')
const { poolPromise } = require('../config/pool')
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { getrowbyID } = require('../services/dbFetch');
const { passwordHash, passwordCompare } = require('../services/password');
const {errorMandatory} = require("../middlewares/errorhandler")

const staffRegister = asyncHandler(async(req, res) => {
  const { staff_id, username, password } = req.body;
  if(!staff_id || ! username || !password ) {
    errorMandatory(res);
  }
  if(! await getrowbyID("staffs", "staff_id", staff_id)){
    res.status(400);
    throw new Error('Invalid Staff ID');
  }
  if(await getrowbyID("users", "staff_id", staff_id)){
    res.status(400);
    throw new Error("staff already registered");
  }
  if(await getrowbyID("users", "username", username )){
    res.status(400);
    throw new Error("username already Taken");
  }
  const role = "staff";
  const hashedPassword = await passwordHash(password);
  const insertStatement = `
  INSERT into 
  users(staff_id, username, password, role)
  VALUES(?, ?, ?, ?)`;

  const [result] = await poolPromise.query(insertStatement, [staff_id, username, hashedPassword, role])
  if(!result.affectedRows){
    res.status(500);
    throw new Error("Registration was Unsuccesful")
  }
  res.status(200).json({message : "Registered Successfully"})
});


const staffLogin = asyncHandler(async(req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("All fields are mandantory");
  }
  const user = await getrowbyID("users", "username", username);
  if (user && (await passwordCompare(password, user.password))) {
    const accessToken =  jwt.sign(
      {
        user: {
          username: user.username,
          staff_id: user.staff_id,
          role : user.role,
        },
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(400);
    throw new Error("Login was Unsuccesful");
  }
})

const staffCurrent = asyncHandler(async(req, res) => {
  if(!req.user){
    res.status(401);
    throw new Error("Authorization token Invalid or missing")
  }
  res.status(200).json(req.user);
})

module.exports = { staffRegister, staffLogin, staffCurrent }