const bodyParser = require("body-parser");
const express = require("express");
const moviesRoutes = require("./routes/movies");
const authRoutes = require("./routes/authentication");
const favoriteRoutes = require("./routes/favorite");
const { errorHandler } = require("./middlewares/error");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use(authRoutes);
app.use(moviesRoutes);
app.use(favoriteRoutes);
app.use(errorHandler);

module.exports = app