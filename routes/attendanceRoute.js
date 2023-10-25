const express = require('express');
const { addStaff, updateStaff, deleteStaff } = require('../controllers/staffController');
const { addDate, deleteDate } = require('../controllers/attendanceContorller');


const router = express.Router();

router.route('/date').post(addDate).delete(deleteDate);


module.exports = router;