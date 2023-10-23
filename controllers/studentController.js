const asyncHandler = require("express-async-handler");
const { poolPromise, pool } = require("../config/pool");
const { getrowbyID, deletebyID } = require("../services/dbFetch");

//Adding a Student
//api/student/ - POST
//protected route - Admin access
const addStudent = asyncHandler(async (req, res) => {
  const { reg_no, student_name, department, degree, year } = req.body;

  if (!reg_no || !student_name || !department || !degree || !year) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  if (await getrowbyID("students", "reg_no", reg_no)) {
    res.status(400);
    throw new Error("Student Already Exists");
  }

  const [{ affectedRows }] = await poolPromise.query(
    `INSERT into students
    VALUES(?, ?, ?, ?, ?)`,
    [reg_no, student_name, department, degree, year]
  );
  if (!affectedRows) {
    res.status(400);
    throw new Error("Error Creating staff");
  }
  res.status(200).json({ message: "Successfully Added the Student" });
});

//Updating a Student
//api/student/ - PUT
//protected route - Admin access
const updateStudent = asyncHandler(async (req, res) => {
  const { updateCol, updateVal } = req.body;
  const reg_no = req.params.id;
  if (!reg_no || !updateCol || !updateVal) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  if (! await getrowbyID("students", "reg_no", reg_no)) {
    res.status(400);
    throw new Error("Student not exist");
  }
  const updateStatement = `
  UPDATE students 
  SET ${updateCol} = ?
  WHERE reg_no = ?
  `;
  const result = await poolPromise.query(updateStatement, [updateVal, reg_no]);
  if (result.affectedRows == 0) {
    res.status(400);
    throw new Error("Invalid Student");
  }
  res.status(200).json({ message: "Updated Student Successfully" });
});

//Deleting a Student
//api/student/ - DELETE
//protected route - Admin access
const deleteStudent = asyncHandler(async (req, res) => {
  const reg_no = req.params.id;
  if (! await getrowbyID("students", "reg_no", reg_no)) {
    res.status(400);
    throw new Error("Student Doesnt exists");
  }
  const result = await deletebyID("students", "reg_no", reg_no);
  if (result.affectedRows == 0) {
    res.status(400);
    throw new Error("Error Deleting the Student");
  }
  res.status(200).json({ message: "Deleted Successfully" });
});

module.exports = { addStudent, updateStudent, deleteStudent };
