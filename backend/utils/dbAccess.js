require("dotenv").config();
const mysql = require("mysql2/promise");
const { NotFoundError } = require("./errors");

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 3306,
};

// Connects to the database
async function connectToDb() {
  const connection = await mysql.createConnection(dbConfig);
  return connection;
}

// Generic get function
async function get(query, params) {
  const connection = await connectToDb();

  let resultList;
  try {
    const [rows] = await connection.execute(query, params);
    resultList = rows;
  } catch (error) {
    console.log(`Error in GET query. More details: ${error}`);
    throw new Error("Internal server error.");
  }

  return resultList;
}

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

// Retrieves user favorites list based on the username
async function getFavoriteListByUsername(username) {
  const sqlQuery = `
  SELECT M.* FROM Favorite F JOIN Movie M ON F.MovieID = M.MovieID JOIN User U ON F.UserID = U.UserID WHERE U.Username = ?;`;

  const result = await get(sqlQuery, [username]);

  if (!result.length) {
    return [];
  }

  return result;
}

// Retrieves user favorites list IDs based on the UserID
async function getFavoriteListIDs(userID) {
  const sqlQuery = `
  SELECT M.MovieID FROM Favorite F JOIN Movie M ON F.MovieID = M.MovieID JOIN User U ON F.UserID = U.UserID WHERE U.UserID = ?;`;

  const result = await get(sqlQuery, [userID]);

  if (!result.length) {
    return [];
  }

  return result;
}

// Retrieve a movie by its ID
async function getMovieByID(movieID) {
  const result = await get(`SELECT * FROM Movie WHERE MovieID = ?;`, [movieID]);

  if (!result.length) {
    throw new NotFoundError("Movie not found.");
  }

  return result[0];
}

// Generic set function
async function set(query, params) {
  const connection = await connectToDb();

  let setResult;
  try {
    const [result] = await connection.execute(query, params);
    setResult = result;
  } catch (error) {
    console.log(`Error in SET query. More details: ${error}`);
    throw new Error("Internal server error.");
  }

  return setResult;
}

// Add new user to the database
async function addNewUser(username, password) {
  const sqlQuery = `INSERT INTO User (UserID, Username, PasswordHash) VALUES (UUID(), ?, ?)`;
  const params = [username, password];

  await set(sqlQuery, params);
}

// Add new movie to the database 
async function addNewMovie(movieData) {
  const sqlQuery = `INSERT INTO Movie (MovieID, Title, ReleaseDate, Rating, PosterPath) VALUES (?, ?, ?, ?, ?)`;
  const params = [
    movieData.id,
    movieData.title,
    movieData.release,
    movieData.rating,
    movieData.posterPath,
  ];

  await set(sqlQuery, params);
}

// Add new favorite to user list
async function addNewFavorite(userID, movieID) {
  const sqlQuery = `INSERT IGNORE INTO Favorite (UserID, MovieID) VALUES (?, ?)`;
  const params = [userID, movieID];

  await set(sqlQuery, params);
}

// Delete a movie from user favorites list
async function deleteFavoriteMovie(userID, movieID) {
  const sqlQuery = `DELETE FROM Favorite WHERE UserID = ? AND MovieID = ?`;
  const params = [userID, movieID];

  await set(sqlQuery, params);
}

// Change the visibility flag in User table
async function toggleVisibility(userID, newVisibility) {
  const sqlQuery = `UPDATE User SET ProfileVisibility = ? WHERE UserID = ?;`
  const params = [newVisibility, userID];

  await set(sqlQuery, params);
}

exports.getUserByUsername = getUserByUsername;
exports.getUserById = getUserById;
exports.addNewUser = addNewUser;
exports.getFavoriteList = getFavoriteListByUsername;
exports.getMovieByID = getMovieByID;
exports.addNewMovie = addNewMovie;
exports.addNewFavorite = addNewFavorite;
exports.deleteFavoriteMovie = deleteFavoriteMovie;
exports.toggleVisibility = toggleVisibility;
exports.getFavoriteListIDs = getFavoriteListIDs;
