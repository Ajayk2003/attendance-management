const express = require('express');
const { addStaff, updateStaff, deleteStaff } = require('../controllers/staffController');
const { addDate } = require('../controllers/attendanceContorller');


const router = express.Router();

router.route('/date').post(addDate);


module.exports = router;