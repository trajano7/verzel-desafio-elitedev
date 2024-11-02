const { HttpError } = require("../errors/errors");
require("dotenv").config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// Get movies from the API by query
async function fetchMovies(query, page) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=pt-BR&page=${page ? page : 1}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Internal server error.");
  }

  const json = await response.json();
  return json;
}

// Get a single movie from the API by ID
async function fetchMovieById(movieID, requestCredits = false) {
  const url = `https://api.themoviedb.org/3/movie/${movieID}?language=pt-BR${
    requestCredits ? "&append_to_response=credits" : ""
  }`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  };

  const response = await fetch(url, options);

  if (response.status === 404) {
    return null;
  } 
  else if (!response.ok) {
    console.log(`HTTP Error in TMDB API fetch, Status: ${response.status}`);
    throw new HttpError(500, "Internal server error.");
  }

  const json = await response.json();
  return json;
}

module.exports = {
  fetchMovies,
  fetchMovieById
};



