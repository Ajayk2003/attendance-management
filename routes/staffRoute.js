const express = require('express');
const { addStaff, updateStaff, deleteStaff } = require('../controllers/staffController');

const router = express.Router();

router.route('/').post(addStaff);
router.route('/:id').put(updateStaff).delete(deleteStaff);

module.exports = router;

