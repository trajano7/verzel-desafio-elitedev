const { getMoviesByQuery, getMovieById } = require("../services/movieService");
const { movieDataFormatter } = require("../utils/dataFormatter");

async function getMovies(req, res, next) {
  const { query, page } = req.query;

  try {
    const moviesData = await getMoviesByQuery({ query, page });

    return res.json({
      message:
        moviesData.movies.length !== 0
          ? "Movies successfully retrieved."
          : "No movies were found.",
      data: moviesData,
    });
  } catch (error) {
    return next(error);
  }
}

async function getMovie(req, res, next) {
  const movieID = req.params["id"];

  try {
    const movieData = await getMovieById(movieID, true);

    res.json({
      message: "Movie successfully retrieved",
      movie: movieDataFormatter(movieData),
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getMovies,
  getMovie
};
