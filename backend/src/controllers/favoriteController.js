const { HttpError } = require("../errors/errors");
const { getUserFavorites, getUserFavoritesIDs, updateFavoriteList, removeFavorite } = require("../services/favoriteService");
const { getUserById } = require("../services/userService");

async function getFavoriteList(req, res, next) {
  const username = req.params["username"];

  try {
    const favorites = await getUserFavorites(username);

    res.json({
      message: "Favorite movie list successfully retrieved.",
      data: {
        movies: favorites,
      },
    });
  } catch (error) {
    return next(error);
  }
}

async function getFavoriteListIDs(req, res, next) {
  const userID = req.token.userID;

  try {
    const user = await getUserById(userID);
    const idList = await getUserFavoritesIDs(userID);

    return res.json({
      message: "Favorite IDs list successfully retrieved.",
      favoritesIDList: idList.map((id) => id.movie_id),
      username: user.username,
      isPrivate: user.profile_is_private,
    });
  } catch (error) {
    return next(error);
  }
} 

async function addNewFavorite (req, res, next) {
  const userID = req.token.userID;
  const { movieID } = req.body;

  if (!movieID) {
    return next(
      new HttpError(400, "Bad request: Missing required field movieID")
    );
  }

  try {
    await updateFavoriteList(userID, movieID);
    res.json({ message: "New movie successfully added to favorite list." });
  } catch (error) {
    return next(error);
  }
}

async function deleteFavorite(req, res, next) {
  const userID = req.token.userID;
  const movieID = req.params.movieID;

  try {
    await removeFavorite(userID, movieID);
    res.json({ message: "Movie successfully deleted from favorites." });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
    getFavoriteList,
    getFavoriteListIDs,
    addNewFavorite,
    deleteFavorite
}