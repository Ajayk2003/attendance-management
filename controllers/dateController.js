
const { poolPromise } = require("../config/pool");
const asyncHandler = require("express-async-handler");
const { errorMandatory } = require("../middlewares/errorhandler");
const { getAll, getDateFetch } = require('../services/dbFetch');


// route : api/dates/ - ADMIN
// method : GET
// desc : Get all the Dates
const getDates = asyncHandler(async(req, res) => {
  const table = `working_days`;
  const [rows] = await getAll(table);
  if (rows.length === 0) {
    res.status(404).json({ message: "No dates found" });
  }
  res.status(200).json({rows});
})


// route : api/dates/ - ADMIN
// method : POST
// desc : Creates a new Date
const addDate = asyncHandler(async(req, res) => {
  const date = req.body.date;
  if(!date) {
    errorMandatory(res);
  }
  const result = await getDateFetch(date);
  if(result){
    res.status(400);
    throw new Error("Date already existed");
  }
  const insertDateQuery = `INSERT INTO working_days VALUES (STR_TO_DATE( ?, '%Y-%m-%d'))`;
  
  const [rows] = await poolPromise.query(insertDateQuery, [date] )
  if(!rows.affectedRows){
    res.status(500);
    throw new Error('Error Addding Date');
  }
  res.status(200).json({message : "date added Successfully"});
});


// route : api/dates/ - ADMIN
// method : DELETE
// desc : DELETE a specific Date
const deleteDate = asyncHandler(async(req, res) => {
  const {date} = req.body;
  if(!date) {
    errorMandatory(res);
  }
  const deleteStatement = `
  Delete from working_days
  where dates = STR_TO_DATE( ?, '%Y-%m-%d')`;

  const [result] = await poolPromise.query(deleteStatement, [date]);
  if(!result.affectedRows){
    res.status(500);
    throw new Error("Error deleting date");
  }
  res.status(200).json({message : `Date deleted ${date} Successfully`});
});

module.exports = { addDate, deleteDate, getDates }