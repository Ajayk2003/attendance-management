const asyncHandler = require("express-async-handler");
const { poolPromise, pool } = require("../config/pool");
const { getrowbyID, deletebyID } = require("../services/dbFetch");
const { errorMandatory } = require("../middlewares/errorhandler");


// route : api/students/ - ADMIN
// method : GET
// desc : Get students by degree and year 
const getStudents = asyncHandler(async(req, res) => {
  const {degree, year } = req.body;
  if(!degree || !year){
    errorMandatory(res);
  }
  const getStudentsQuery = `SELECT * from students where degree = ? and year = ?`;
  const [rows] = await poolPromise.query(getStudentsQuery, [degree, year]);
  if(!rows) { 
    res.status(401);
    throw new Error("Error getting students");
  }
  res.status(200).json({rows});
})

// route : api/students/ - ADMIN
// method : POST
// desc : Create a student
const addStudent = asyncHandler(async (req, res) => {
  const { reg_no, student_name, department, degree, year } = req.body;
  if (!reg_no || !student_name || !department || !degree || !year) {
    errorMandatory(res);
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
  res.status(201).json({ message: "Successfully Added the Student" });
});

// route : api/students/:id - ADMIN
// method : PUT
// desc : Update a student
const updateStudent = asyncHandler(async (req, res) => {
  const { updateCol, updateVal } = req.body;
  const reg_no = req.params.id;
  if (!reg_no || !updateCol || !updateVal) {
    errorMandatory(res);
  }
  if (! await getrowbyID("students", "reg_no", reg_no)) {
    res.status(404);
    throw new Error("Student does not exist");
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

// route : api/students/:id - ADMIN
// method : DELETE
// desc : Deletes a student
const deleteStudent = asyncHandler(async (req, res) => {
  const reg_no = req.params.id;
  if (! await getrowbyID("students", "reg_no", reg_no)) {
    res.status(404);
    throw new Error("Student Doesnt exists");
  }
  const result = await deletebyID("students", "reg_no", reg_no);
  if (result.affectedRows == 0) {
    res.status(400);
    throw new Error("Error Deleting the Student");
  }
  res.status(200).json({ message: "Deleted Successfully" });
});

module.exports = { addStudent, updateStudent, deleteStudent, getStudents };
