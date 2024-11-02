const { Favorite, Movie, User } = require("../models");
const { favoriteListFormatter } = require("../utils/dataFormatter");
const { isMovieStored, addMovieToDb } = require("./movieService");
const { HttpError } = require("../errors/errors");

async function getUserFavorites(username) {
  const favorites = await Movie.findAll({
    include: [
      {
        model: User,
        where: { username: username },
        through: { model: Favorite },
      },
    ],
  });

  return favoriteListFormatter(favorites);
}

async function updateFavoriteList(userID, movieId) {
  if (!(await isMovieStored(movieId))) {
    await addMovieToDb(movieId);
  }

  await Favorite.upsert({
    user_id: userID,
    movie_id: movieId,
  });
}

async function getUserFavoritesIDs(userID) {
  return await Favorite.findAll({
    where: {
      user_id: userID,
    },
    attributes: ["movie_id"],
  });
}

async function removeFavorite(userID, movieID) {
  const favorite = await Favorite.findOne({
    where: {
      user_id: userID,
      movie_id: movieID
    },
  });

  if (!favorite) {
    throw new HttpError(404, "Movie is not in user favorite list.")
  }

  favorite.destroy();
}

module.exports = {
  getUserFavorites,
  updateFavoriteList,
  getUserFavoritesIDs,
  removeFavorite
};
