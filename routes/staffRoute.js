const express = require('express');
const { addStaff, updateStaff, deleteStaff } = require('../controllers/staffController');
const { staffRegister, staffLogin } = require('../controllers/userController');
const { adminVerify } = require('../middlewares/authVerify');

const router = express.Router();

router.use(adminVerify);
router.route('/').post(addStaff);
router.route('/:id').put(updateStaff).delete(deleteStaff);
module.exports = router;

