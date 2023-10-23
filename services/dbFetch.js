const { poolPromise, pool } = require("../config/pool");


const getAll = async(table) => {
  const query = `
  SELECT * from ?`;
  const result = await poolPromise.query(query, [table]);
  return result; 
}

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

module.exports = { getrowbyID, deletebyID };