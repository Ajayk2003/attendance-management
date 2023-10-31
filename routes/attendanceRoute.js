const express = require('express');
const { addStaff, updateStaff, deleteStaff } = require('../controllers/staffController');
const { addDate, deleteDate, addAttendance } = require('../controllers/attendanceContorller');


const router = express.Router();

router.route('/').post(addAttendance);
router.route('/date').post(addDate).delete(deleteDate);

module.exports = router;