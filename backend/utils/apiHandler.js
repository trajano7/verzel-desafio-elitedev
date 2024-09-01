const { NotFoundError } = require("./errors");
require('dotenv').config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

async function getMoviesBySearch(query) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=pt-BR&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        `Bearer ${TMDB_API_KEY}`,
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    console.log(`HTTP Error in TMDB API fetch, Status: ${response.status}`);
    throw new Error("Internal server error.");
  }

  const json = await response.json();
  return json;
}

async function getMovieByID(movieID) {
  const url = `https://api.themoviedb.org/3/movie/${movieID}?language=pt-BR`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        `Bearer ${TMDB_API_KEY}`,
    },
  };

  const response = await fetch(url, options);

  if (response.status === 404) {
    throw new NotFoundError("Could not find the movie.");
  }
  else if (!response.ok) {
    console.log(`HTTP Error in TMDB API fetch, Status: ${response.status}`);
    throw new Error("Internal server error.");
  }

  const json = await response.json();
  return json;
}

exports.getMoviesBySearch = getMoviesBySearch;
exports.getAPIMovieByID = getMovieByID;
