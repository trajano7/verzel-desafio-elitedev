const express = require("express");
const movieController = require("../controllers/movieController");

const router = express.Router();

// Get movies based on a search query
router.get("/movies", movieController.getMovies);

// Get a specfific movie by ID
router.get("/movies/:id", movieController.getMovie);

module.exports = router;
