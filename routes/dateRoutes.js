const express = require('express');
const { adminVerify } = require('../middlewares/authVerify');
const { addDate, deleteDate, getDates } = require('../controllers/dateController');
const router = express.Router();

router.route('/')
  .all(adminVerify)
  .get(getDates)
  .post(addDate)
  .delete(deleteDate);

module.exports = router;
