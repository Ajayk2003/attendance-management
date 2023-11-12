/* 
MINUTE DATABASE FETCHES REFRACTED HERE
1 - Getting everything from a table 
2 - Get a row by a table's primary key
3 - Deleting a row by primary key
*/

const { poolPromise, pool } = require("../config/pool");

const getAll = async (table) => {
  const query = `SELECT * from ${table}`;
  const result = await poolPromise.query(query)
  return result;
};

const getrowbyID = async (table, pk_name, pk_value) => {
  const [rows] = await poolPromise.query(
    `SELECT * from ${table}
    WHERE ${pk_name} = ?`,
    [pk_value]
  );
  return rows[0];
};

const deletebyID = async (table, pk_name, pk_value) => {
  const result = await poolPromise.query(
    `
  DELETE from ${table} 
  WHERE ${pk_name} = ?`,
    [pk_value]
  );
  return result;
};

const getDateFetch = async(date) => {
  const getDate = `
  SELECT * from working_days
  where dates = STR_TO_DATE( ?, '%Y-%m-%d')`
  const [result] = await poolPromise.query(getDate, [date])
  return result[0];
}

module.exports = { getrowbyID, deletebyID, getAll, getDateFetch };
