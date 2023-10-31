const { poolPromise } = require("../config/pool");
const asyncHandler = require("express-async-handler");
const { getrowbyID, deletebyID } = require("../services/dbFetch");

const getDate = async(date) => {
  const getDate = `
  SELECT * from working_days
  where working_days = STR_TO_DATE( ?, '%Y-%m-%d')`
  const [result] = await poolPromise.query(getDate, [date])
  return result[0];
}

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
});

const deleteDate = asyncHandler(async(req, res) => {
  const date = req.body.date;
  if(!date) {
    res.status(400);
    throw new Error('Date field is mandatory');
  }
  const deleteStatement = `
  Delete from working_days
  where working_days = STR_TO_DATE( ?, '%Y-%m-%d')`

  const [result] = await poolPromise.query(deleteStatement, [date]);
  console.log(result);
  if(!result.affectedRows){
    res.status(500);
    throw new Error("Error deleting date");
  }
  res.status(200).json({message : `Date deleted ${date} Successfully`});
});

const addAttendance = asyncHandler(async(req, res) => {
  const {reg_no, period, date} = req.body;
  if(!getrowbyID("students","reg_no", reg_no) || !getDate(date)){
    res.status(404);
    throw new Error("Student or Date Doesnt exist");
  }

  const insertStatement = `
  insert into attendance(reg_no, ${period}) 
  values(?, 1) `;
const [result] = await poolPromise.query(insertStatement, [ reg_no])  
res.status(201).json({message : "attendance added"});
})

module.exports = { addDate, deleteDate, addAttendance };