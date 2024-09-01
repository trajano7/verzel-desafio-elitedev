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

async function getFavoriteListByUsername(username) {
  const sqlQuery = `
  SELECT M.* FROM Favorite F JOIN Movie M ON F.MovieID = M.MovieID JOIN User U ON F.UserID = U.UserID WHERE U.Username = ?;`;

  const result = await get(sqlQuery, [username]);

  if (!result.length) {
    throw new NotFoundError("No favorite movies found for the specified user.");
  }

  return result;
}

async function getMovieByID(movieID) {
  const result = await get(`SELECT * FROM Movie WHERE MovieID = ?;`, [movieID]);

  if (!result.length) {
    throw new NotFoundError("Movie not found.");
  }

  return result[0];
}

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

async function addNewUser(username, password) {
  const sqlQuery = `INSERT INTO User (UserID, Username, PasswordHash) VALUES (UUID(), ?, ?)`;
  const params = [username, password];

  await set(sqlQuery, params);
}

async function addNewMovie(movieData) {
  const sqlQuery = `INSERT INTO Movie (MovieID, Title, Overview, ReleaseDate, Rating, PosterPath) VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [
    movieData.id,
    movieData.title,
    movieData.overview,
    movieData.release,
    movieData.rating,
    movieData.posterPath,
  ];

  await set(sqlQuery, params);
}

async function addNewFavorite(userID, movieID) {
  const sqlQuery = `INSERT IGNORE INTO Favorite (UserID, MovieID) VALUES (?, ?)`;
  const params = [userID, movieID];

  await set(sqlQuery, params);
}

async function deleteFavoriteMovie(userID, movieID) {
  const sqlQuery = `DELETE FROM Favorite WHERE UserID = ? AND MovieID = ?`;
  const params = [userID, movieID];

  await set(sqlQuery, params);
}

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
