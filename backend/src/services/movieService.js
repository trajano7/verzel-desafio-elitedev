const { HttpError } = require("../errors/errors");
const { Movie } = require("../models");
const {
  movieListFormatter,
} = require("../utils/dataFormatter");
const { fetchMovies, fetchMovieById } = require("../utils/tmdbClient");

async function getMoviesByQuery({ query, page }) {
  response = await fetchMovies(query, page);
  const movies = movieListFormatter(response.results);

  return {
    movies,
    pagination: {
      page: response.page,
      totalPages: response.total_pages,
    },
  };
}

async function getMovieById(id, fetchCredits = false) {
  const movie = await fetchMovieById(id, fetchCredits);

  if (!movie) {
    throw new HttpError(404, "Could not find the movie.");
  }

  return movie;
}

async function isMovieStored(movieId) {
  const movie = await Movie.findOne({
    where: {
      movie_id: movieId,
    },
  });

  return movie !== null; 
}

async function addMovieToDb(movieId) {
  const movie = await getMovieById(movieId);
  const newMovie = await Movie.create({
    movie_id: movie.id,
    title: movie.title,
    release_date: movie.release_date,
    rating: movie.vote_average,
    poster_path: movie.poster_path,
  });

  return newMovie;
}

module.exports = {
  getMoviesByQuery,
  getMovieById,
  isMovieStored,
  addMovieToDb
};
