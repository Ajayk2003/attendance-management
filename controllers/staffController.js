const { poolPromise } = require("../config/pool");
const asyncHandler = require("express-async-handler");
const { getrowbyID, deletebyID } = require("../services/dbFetch");
const { errorMandatory } = require("../middlewares/errorhandler");

// route : api/staffs/ - ADMIn
// method : GET
// desc : Get staffs by department
const getStaff = asyncHandler(async (req, res) => {
  const { department } = req.body;
  if (!department) {
    errorMandatory(res);
  }
  const getStaffQuery = `SELECT * from staffs where department = ?`;
  const [rows] = await poolPromise.query(getStaffQuery, [department]);
  if (!rows) {
    res.status(401);
    throw new Error("Cant get your results");
  }
  res.status(200).json({ rows });
});

// route : api/staffs/ - ADMIN
// method : PUT
// desc : Creates a staff
const addStaff = asyncHandler(async (req, res) => {
  const { staff_id, staff_name, department } = req.body;
  if (!staff_id || !staff_name || !department) {
    errorMandatory(res);
  }
  if (await getrowbyID("staffs", "staff_id", staff_id)) {
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
  res.status(201).json({ message: "Staff Added Successfully" });
});

// route : api/staffs/:id - ADMIN
// method : PUT
// desc : update a staff
const updateStaff = asyncHandler(async (req, res) => {
  const { updateCol, updateVal } = req.body;
  const staff_id = req.params.id;
  if (!staff_id || !updateCol || !updateVal) {
    errorMandatory(res);
  }
  if (!(await getrowbyID("staffs", "staff_id", staff_id))) {
    res.status(404);
    throw new Error("staff not exists");
  }
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

// route : api/staffs/:id - ADMIN
// method : DELETE
// desc : deletes a staff
const deleteStaff = asyncHandler(async (req, res) => {
  const staff_id = req.params.id;
  if (!(await getrowbyID("staffs", "staff_id", staff_id))) {
    res.status(400);
    throw new Error("staff Doesnt exists");
  }
  const result = await deletebyID("staffs", "staff_id", staff_id);
  if (result.affectedRows == 0) {
    res.status(400);
    throw new Error("Error Deleting the staff");
  }
  res.status(200).json({ message: "Deleted Successfully" });
});

module.exports = { addStaff, updateStaff, deleteStaff, getStaff };
