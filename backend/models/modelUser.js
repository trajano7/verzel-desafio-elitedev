const { get, set } = require("./dbUtils");
const { NotFoundError } = require("../errors/errors");

// Retrieve user information based on the username provided
async function getUserByUsername(username) {
  const result = await get(`SELECT * FROM User WHERE Username = ?;`, [
    username,
  ]);

  if (!result.length) {
    throw new NotFoundError("User not found.");
  }

  return result[0];
}

// Retrieve user information based on the user ID provided
async function getUserById(userId) {
  const result = await get(`SELECT * FROM User WHERE UserID = ?;`, [userId]);

  if (!result.length) {
    throw new NotFoundError("User not found.");
  }

  return result[0];
}

// Check if a user exists based on the username provided
async function userExists(username) {
  const result = await get(`SELECT COUNT(*) as count FROM User WHERE Username = ?;`, [
    username,
  ]);

  return result[0].count > 0; 
}

// Add new user to the database
async function addNewUser(username, password, userID) {
  const sqlQuery = `INSERT INTO User (UserID, Username, PasswordHash) VALUES (?, ?, ?)`;
  const params = [userID, username, password];

  await set(sqlQuery, params);
}

// Change the visibility flag in User table
async function toggleVisibility(userID, newVisibility) {
  const sqlQuery = `UPDATE User SET ProfileVisibility = ? WHERE UserID = ?;`;
  const params = [newVisibility, userID];

  await set(sqlQuery, params);
}

module.exports = { getUserByUsername, getUserById, addNewUser, toggleVisibility, userExists };
