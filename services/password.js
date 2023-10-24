const md5 = require('md5');

const passwordHash = async(password) => {
  return md5(password)
}

const passwordCompare = async(password, storedHash) => {
  return md5(password) == storedHash;
}

module.exports = { passwordHash, passwordCompare }