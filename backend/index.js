const bodyParser = require("body-parser");
const express = require("express");
const moviesRoutes = require("./routes/movies");
const authRoutes = require("./routes/authentication");
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

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Running in port ${PORT}`);
});
