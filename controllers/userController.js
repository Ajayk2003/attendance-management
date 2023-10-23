const bcrypt = require('bcryptjs')
const poolPromise = require('../config/pool')



const staffLogin = async(req, res) => {
  const { username, password } = req.body;
  if( !username || !password){
    res.status(400);
    throw new error('All fields are mandatory');
  }
  const [rows,fields] = await promisePool.query("SELECT * from staffs WHERE username = ");
}