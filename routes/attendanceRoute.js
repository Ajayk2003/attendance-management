const {Router} = require('express');
const router = Router();
const { getAttendance, addAttendance } = require("../controllers/attendanceContorller");

router.route('/').get(getAttendance).post(addAttendance);

module.exports = router;