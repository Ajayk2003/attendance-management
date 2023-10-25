const { poolPromise } = require("../config/pool");
const asyncHandler = require("express-async-handler");
const { getrowbyID } = require("../services/dbFetch");

const getAttendance = asyncHandler(async(req, res) => {
  const { degree, year } = req.body;
  getStatement = `
  SELECT * from students 
  inner join attendance 
  on reg_no `;
})

const addDate = asyncHandler(async(req, res) => {
  const date = req.body.date;
  if(!date) {
    res.status(400);
    throw new Error('Date field is mandatory');
  }


  const insertStatement = `
  INSERT INTO working_days 
  VALUES (STR_TO_DATE( ?, '%Y-%m-%d'))`;
  
  const [rows] = await poolPromise.query(insertStatement, [date] )
  if(! rows.affectedRows){
    res.status(500);
    throw new Error('Error Addding Date');
  }
  res.status(200).json({message : "date added Successfully"});
})

module.exports = { addDate };