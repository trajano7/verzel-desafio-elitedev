require("dotenv").config();
const mysql = require("mysql2/promise");

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  database: process.env.DB_NAME || "MoviesDB",
  password: process.env.DB_PASSWORD || "root",
  port: process.env.DB_PORT || 3306,
};

// Connects to the database
async function connectToDb() {
  const connection = await mysql.createConnection(dbConfig);
  return connection;
}

module.exports = { connectToDb };