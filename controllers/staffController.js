const { poolPromise } = require("../config/pool");
const asyncHandler = require("express-async-handler");
const { getrowbyID, deletebyID } = require("../services/dbFetch");

//Add Staff
//api/staff/ - POST
// Protected Route - Admin Access
const addStaff = asyncHandler(async (req, res) => {
  const { staff_id, staff_name, department } = req.body;
  if (!staff_id || !staff_name || !department) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  if ((await getrowbyID("staffs", "staff_id", staff_id)) == 0) {
    res.status(400);
    throw new Error("Staff already exists ");
  }
  const [{ affectedRows }] = await poolPromise.query(
    `
    INSERT into 
    staffs(staff_id, staff_name, department)
    VALUES(?, ?, ?)`,
    [staff_id, staff_name, department]
  );
  if (!affectedRows) {
    res.status(400);
    throw new Error("Error Creating staff");
  }
  res.status(200).json({message : "Staff Added Successfully"})
});

//Updating a Staff
//api/staff/ - PUT
// Protected Route - Admin Access
const updateStaff = asyncHandler(async (req, res) => {
  const { updateCol, updateVal } = req.body;
  const staff_id = req.params.id;
  if (!staff_id || !updateCol || !updateVal) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const NotAvailable = await getrowbyID("staffs", "staff_id", staff_id);
  if (NotAvailable) {
    res.status(400);
    throw new Error("staff not exists");
  }
  console.log(NotAvailable);
  const updateStatement = `
  UPDATE staffs 
  SET ${updateCol} = ?
  WHERE staff_id = ?
  `;
  const result = await poolPromise.query(updateStatement, [
    updateVal,
    staff_id,
  ]);
  if (result.affectedRows == 0) {
    res.status(400);
    throw new Error("error updating staff details");
  }
  res.status(200).json({ message: "Updated staff Successfully" });
});

//Deleting a Staff
//api/staff/ - DELETE
//protected route - Admin access
const deleteStaff = asyncHandler(async (req, res) => {
  const staff_id = req.params.id;
  const NotAvailable = await getrowbyID("staffs", "staff_id", staff_id);
  if (NotAvailable) {
    res.status(400);
    throw new Error("Student Doesnt exists");
  }
  const result = await deletebyID("staffs", "staff_id", staff_id);
  if (result.affectedRows == 0) {
    res.status(400);
    throw new Error("Error Deleting the Student");
  }
  res.status(200).json({ message: "Deleted Successfully" });
});

module.exports = { addStaff, updateStaff, deleteStaff };
