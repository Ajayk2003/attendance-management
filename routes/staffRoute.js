const express = require("express");
const {
  addStaff,
  updateStaff,
  deleteStaff,
  getStaff,
} = require("../controllers/staffController");
const { adminVerify } = require("../middlewares/authVerify");

const router = express.Router();

router.route("/")
  .all(adminVerify)
  .get(getStaff)
  .post(addStaff);
router.route("/:id")
  .all(adminVerify)
  .put(updateStaff)
  .delete(deleteStaff);

module.exports = router;
