const express = require('express');
const { addStudent, updateStudent, deleteStudent } = require('../controllers/studentController');
const { adminVerify } = require('../middlewares/authVerify');

const router = express.Router();

router.use(adminVerify);
router.route('/').post(addStudent);
router.route('/:id').put(updateStudent).delete(deleteStudent);


module.exports = router;