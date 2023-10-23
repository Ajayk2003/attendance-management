const { constants } = require("../constants");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  const errorType = Object.keys(constants).find(
    (key) => constants[key] == statusCode
  );

  return res.status(statusCode).json({
    title: errorType,
    message: err.message,
    stackTrace: err.stack, 
  });
};

module.exports = errorHandler;