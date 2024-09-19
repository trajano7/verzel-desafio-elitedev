const { get, set } = require("./dbUtils");
const { NotFoundError } = require("../errors/errors");

// Retrieve a movie by its ID
async function getMovieByID(movieID) {
  const result = await get(`SELECT * FROM Movie WHERE MovieID = ?;`, [movieID]);

  if (!result.length) {
    throw new NotFoundError("Movie not found.");
  }

  return result[0];
}

async function checkMovieExists(movieID) {
  const sqlQuery = `SELECT COUNT(*) AS count FROM Movie WHERE MovieID = ?;`;
  const result = await get(sqlQuery, [movieID]);

  return result[0].count > 0;
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

module.exports = { getMovieByID, addNewMovie, checkMovieExists };
