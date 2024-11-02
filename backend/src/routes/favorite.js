const express = require("express");
const favoriteController = require("../controllers/favoriteController");
const {
  checkAuthenticationMiddleware,
  checkProfileVisibility,
  checkProfileOwner,
} = require("../middlewares/authentication");


const router = express.Router();

// Get user favorite list by username
// If the profile is public, return the list to everyone;
// if the profile is private, return the list only to the owner.
router.get(
  "/favorites/:username",
  checkProfileVisibility,
  checkAuthenticationMiddleware,
  checkProfileOwner,
  favoriteController.getFavoriteList
);

router.use(checkAuthenticationMiddleware);

// Get the IDs of all movies from a user favorite list
// Used to keep track of someone favorites list in the front
router.get("/favorites/", favoriteController.getFavoriteListIDs);

// Add a movie to user favorites list
router.post("/favorites", favoriteController.addNewFavorite);

// Delete a movie from a user favorites list
router.delete("/favorites/:movieID", favoriteController.deleteFavorite);

module.exports = router;
