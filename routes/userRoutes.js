const express = require('express');
const { staffRegister, staffLogin, staffCurrent } = require('../controllers/userController');
const { AuthVerify } = require('../middlewares/authVerify');

const router = express.Router();

router.route('/register').post(staffRegister);
router.route('/login').post(staffLogin);
router.route('/current').get(AuthVerify, staffCurrent);
module.exports = router;