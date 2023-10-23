const mysql2 = require('mysql2');

  const pool = mysql2.createPool({
    host: "127.0.0.1",
    port: 3306,
    user: 'root',
    password: 'ajay1280',
    database: 'studentattendance',
  });

  const poolPromise = pool.promise();

module.exports = { pool, poolPromise };