const express = require('express');
const { addStudent, updateStudent, deleteStudent } = require('../controllers/studentController');

const router = express.Router();

router.route('/').post(addStudent);
router.route('/:id').put(updateStudent).delete(deleteStudent);


module.exports = router;