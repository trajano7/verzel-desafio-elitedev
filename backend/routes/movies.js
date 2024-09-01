const express = require("express");
const {
  checkAuthMiddleware,
  checkProfileVisibility,
  checkProfileOwner,
} = require("../utils/authentication");
const { getMoviesBySearch, getAPIMovieByID } = require("../utils/apiHandler");
const { NotFoundError } = require("../utils/errors");
const {
  getFavoriteList,
  addNewMovie,
  addNewFavorite,
  deleteFavoriteMovie,
  toggleVisibility,
} = require("../utils/dbAccess");
const { isMovieStored } = require("../utils/dbUtils");
const { isValidProfileVisibility } = require("../utils/validation");

const router = express.Router();

//
router.get("/movies", async (req, res, next) => {
  const { query } = req.query;

  let queryResult;
  try {
    queryResult = await getMoviesBySearch(query);
  } catch (error) {
    return next(error);
  }

  if (!queryResult.results.length) {
    return next(new NotFoundError("No movies found for the given query."));
  }

  const movieList = queryResult.results.map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      release: movie.release_date,
      rating: movie.vote_average,
      poster_url: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
    };
  });

  res.json({
    message: "Movies successfully retrieved.",
    movies: movieList,
  });
});

router.get(
  "/favorites/:username",
  checkProfileVisibility,
  checkAuthMiddleware,
  checkProfileOwner,
  async (req, res, next) => {
    const username = req.params["username"];

    try {
      const favoriteList = await getFavoriteList(username);

      const formattedList = favoriteList.map((movie) => {
        return {
          id: movie.MovieID,
          title: movie.Title,
          overview: movie.Overview,
          release: movie.ReleaseDate,
          rating: movie.Rating,
          poster_url: `https://image.tmdb.org/t/p/original${movie.PosterPath}`,
        };
      });

      res.json({
        message: "Favorite movie list successfully retrieved.",
        movies: formattedList,
      });
    } catch (error) {
      return next(error);
    }
  }
);

// router.use("/:username/favorites", checkProfileVisibility);
router.use(checkAuthMiddleware);

// precisa feedback pra mostrar se o usario ja tem aquele filme como favorito
router.post("/favorites", async (req, res, next) => {
  const userID = req.token.userID;
  const { movieID } = req.body;

  if (!movieID) {
    res
      .status(400)
      .json({ message: "Bad request: Missing required field movieID" });
  }

  try {
    const movieIsStored = await isMovieStored(movieID);
    if (!movieIsStored) {
      const movieData = await getAPIMovieByID(movieID);
      const formattedMovie = {
        id: movieData.id,
        title: movieData.title,
        overview: movieData.overview,
        release: movieData.release_date,
        rating: movieData.vote_average,
        posterPath: movieData.poster_path,
      };
      await addNewMovie(formattedMovie);
    }
    await addNewFavorite(userID, movieID);
    res.json({ message: "New movie successfully added to favorite list." });
  } catch (error) {
    return next(error);
  }
});

router.delete("/favorites/:movieID", async (req, res, next) => {
  const userID = req.token.userID;
  const movieID = req.params.movieID;

  try {
    await deleteFavoriteMovie(userID, movieID);
    res.json({ message: "Movie successfully deleted from favorites." });
  } catch (error) {
    next(error);
  }
});

router.patch("/favorites", async (req, res, next) => {
  const userID = req.token.userID;
  const { visibility } = req.body;

  if (!isValidProfileVisibility(visibility)) {
    res
      .status(400)
      .json({
        message:
          "Bad request: Invalid profile visibility value. Must be 'public' or 'private'.",
      });
  }

  try {
    await toggleVisibility(userID, visibility);
    res.json({ message: "Favorite list visibility successfully changed." })
  } catch (error) {
    next(error);
  }

});

module.exports = router;
