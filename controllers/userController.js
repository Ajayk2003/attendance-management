const bcrypt = require('bcryptjs')
const { poolPromise } = require('../config/pool')
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { getrowbyID } = require('../services/dbFetch');


const staffRegister = asyncHandler(async(req, res) => {
  const { staff_id, username, password } = req.body;
  if(!staff_id || ! username || !password ) {
    res.status(400);
    throw new Error('All fields are mandatory');
  }

  if(! await getrowbyID("staffs", "staff_id", staff_id)){
    res.status(400);
    throw new Error('Invalid Staff ID');
  }

  if(await getrowbyID("staff_access", "staff_id", staff_id)){
    res.status(400);
    throw new Error("staff already registered");
  }
  if(await getrowbyID("staff_access", "username", username )){
    res.status(400);
    throw new Error("username already Taken");
  }

  const insertStatement = `
  INSERT into 
  staff_access(staff_id, username, password)
  VALUES(?, ?, ?)`;

  const [result] = await poolPromise.query(insertStatement, [staff_id, username, password])
  if(! result.affectedRows){
    res.status(500);
    throw new Error("Error registering")
  }
  res.status(200).json({message : "Registered Successfully"})
});

module.exports = { staffRegister }