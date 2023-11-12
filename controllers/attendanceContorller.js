const { poolPromise } = require("../config/pool");
const asyncHandler = require("express-async-handler");
const { getrowbyID, deletebyID } = require("../services/dbFetch");
const { errorMandatory } = require("../middlewares/errorhandler");


// route : api/attendance/ - ADMIN, STAFF
// method : GET
// desc : Get attendance of students
const getAttendance = asyncHandler(async(req, res) => {
  const { degree, year } = req.body;
  if(!degree || !year){ 
    errorMandatory(res);
  }
  attendanceGetQuery = `
  SELECT * from students 
  inner join attendance 
  on students.reg_no = attendance.reg_no
  WHERE degree = ? and year = ? `;

  const [rows] = await poolPromise.query(attendanceGetQuery, [degree, year]);
  if(rows.length == 0){
    res.status(400);
    throw new Error("Cant get the Data");
  }
  res.status(200).json({rows});
})

// route : api/attendance/ - ADMIN, STAFF 
// method : POST 
// desc : Adding/ modifying attendance of students
const addAttendance = asyncHandler(async(req, res) => {
  const {rows} = req.body;
  if(!rows){
    errorMandatory(res);
  }
  //Getting every student's value and updating their attendance
  for(const row of rows){
    const reg_no = row.reg_no;
    const period = row.period;
    const value = row.value;
    const date = row.date;
    const changedBy = req.user.staff_id;
    if(!reg_no || !period || !value || !date ){
      errorMandatory(res);
    }
    console.log(changedBy);
    if(!getrowbyID("students","reg_no", reg_no)){
      res.status(404);
      throw new Error("Student doesnt exist");
    }
    //checking student attendnace already existing on that date 
    const checkAttendanceQuery = `
    select * from attendance 
    where reg_no = ? and 
    date = (STR_TO_DATE( ?, '%Y-%m-%d')) `
    const [isAvailable] = await poolPromise.query(checkAttendanceQuery, [reg_no, date]);
    if(isAvailable.length == 0){
      //New attendance data inserting for a student 
      const insertQuery = `
      insert into attendance(reg_no, ${period}, date, changed_by) 
      values(?, ?, ?, ?) `;
      const [rows] = await poolPromise.query(insertQuery, [reg_no, value, date, changedBy]);
      if(rows.affectedRows == 0 ){
        res.status(500)
        throw new Error(`Error add attendance for ${reg_no}`);
      }
    }
    else{
      //Adding/Modifying student attendance already exisiting on that date
      const updateQuery = `
      UPDATE attendance 
      SET ${period} = ?, changed_by = ? 
      where reg_no = ?
       `;
      const [result] = await poolPromise.query(updateQuery, [value, changedBy, reg_no]);
      if(result.affectedRows == 0){
        res.status(500);
        throw new Error(`Error modifying attendance for ${reg_no}`);
      }
    }
  }
  res.status(200).json({message : "Attendance added successfully for everyone"})
});

module.exports = { addAttendance, getAttendance };