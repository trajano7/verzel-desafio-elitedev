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
  getFavoriteListIDs,
  getUserById,
} = require("../utils/dbAccess");
const { isMovieStored } = require("../utils/dbUtils");
const { isValidProfileVisibility } = require("../utils/validation");
const { formatMovieData } = require("../utils/formatData");

const router = express.Router();

// Get movies based on a search query
router.get("/movies", async (req, res, next) => {
  const { query, page } = req.query;

  let queryResult;
  try {
    queryResult = await getMoviesBySearch(query, page);
  } catch (error) {
    return next(error);
  }

  if (!queryResult.results.length) {
    return res.json({
      message: "No movies were found.",
      data: {
        pagination: {
          page: 0,
          totalPages: 0,
        },
        movies: [],
      },
    });
  }

  const movieList = queryResult.results.map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      release: movie.release_date,
      rating: movie.vote_average,
      posterURL: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
    };
  });

  res.json({
    message: "Movies successfully retrieved.",
    data: {
      pagination: {
        page: queryResult.page,
        totalPages: queryResult.total_pages,
      },
      movies: movieList,
    },
  });
});

// Get a specfific movie by ID
router.get("/movies/:id", async (req, res, next) => {
  const movieID = req.params["id"];

  let movieData;
  try {
    movieData = await getAPIMovieByID(movieID, true);
  } catch (error) {
    return next(error);
  }

  const formattedMovie = formatMovieData(movieData);

  res.json({
    message: "Movie successfully retrieved",
    movie: formattedMovie,
  });
});

// Get user favorite list by username
// If the profile is public, return the list to everyone;
// if the profile is private, return the list only to the owner.
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
          release: movie.ReleaseDate,
          rating: movie.Rating,
          posterURL: `https://image.tmdb.org/t/p/original${movie.PosterPath}`,
        };
      });

      res.json({
        message: "Favorite movie list successfully retrieved.",
        data: {
          movies: formattedList,
        },
      });
    } catch (error) {
      return next(error);
    }
  }
);

router.use(checkAuthMiddleware);

// Get the IDs of all movies from a user favorite list
// Used to keep track of someone favorites list in the front
router.get("/favorites/", async (req, res, next) => {
  const userID = req.token.userID;

  let userData;
  try {
    userData = await getUserById(userID);
  } catch (error) {
    return next(error)
  }

  let response;
  try {
    response = await getFavoriteListIDs(userID);
  } catch (error) {
    return next(error);
  }

  let idList = [];
  if (response) {
    idList = response.map((item) => item.MovieID);
  }

  res.json({
    message: "Favorite IDs list successfully retrieved.",
    favoritesIDList: idList,
    profileVisibility: userData.ProfileVisibility,
  });
});

// Add a movie to user favorites list
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

// Delete a movie from a user favorites list
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

// Change the visibility of a user profile
router.patch("/favorites", async (req, res, next) => {
  const userID = req.token.userID;
  const { visibility } = req.body;

  if (!isValidProfileVisibility(visibility)) {
    return res.status(400).json({
      message:
        "Bad request: Invalid profile visibility value. Must be 'public' or 'private'.",
    });
  }

  try {
    await toggleVisibility(userID, visibility);
    res.json({ message: "Favorite list visibility successfully changed." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
