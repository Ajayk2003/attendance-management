const express = require('express');
const { addStudent, updateStudent, deleteStudent, getStudents } = require('../controllers/studentController');
const { adminVerify } = require('../middlewares/authVerify');

const router = express.Router();

router.route('/').post(adminVerify, addStudent).get(getStudents);
router.route('/:id').all(adminVerify).put(updateStudent).delete(deleteStudent);


module.exports = router;