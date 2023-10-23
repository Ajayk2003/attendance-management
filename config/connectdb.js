const { poolPromise } = require("./pool");
const connectDB = async () => {
  try {
    const connection  = await poolPromise.getConnection();
    console.log(connection);
  } catch (error) {    
    console.log("error occurred", error);
    process.exit(1);
  }
};

module.exports = connectDB;
