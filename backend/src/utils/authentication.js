const { sign, verify } = require("jsonwebtoken");
const { compare, hash } = require("bcryptjs");
const { secretKey } = require('../config/dbConfig');

// Create a authentication token
function createToken(userID, username) {
  return sign({ userID, username }, secretKey, { expiresIn: "12h" });
}

// Validate the token
function isValidToken(token) {
  return verify(token, secretKey);
}

// Create a hash of the password
async function hashPassword(password) {
  const hashResult = await hash(password, 10);

  return hashResult;
}

// Verify if password is valid
async function isValidPassword(password, storedPassword) {
  return await compare(password, storedPassword);
}

module.exports = {
  createToken,
  isValidToken,
  hashPassword,
  isValidPassword,
};

