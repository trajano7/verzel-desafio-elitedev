require("dotenv").config();
const mysql = require("mysql2/promise");

// const dbConfig = {
//   host: 'db',
//   user: 'user_db',
//   database: 'MoviesDB',
//   password: '123',
//   port: 3306
// };

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || 'MoviesDB',
  password: process.env.DB_PASSWORD || '123',
  port: process.env.DB_PORT || 3306
};

// Connects to the database
async function connectToDb() {
  const connection = await mysql.createConnection(dbConfig);
  return connection;
}

module.exports = { connectToDb };