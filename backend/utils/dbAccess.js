require("dotenv").config();
const mysql = require("mysql2/promise");
const { NotFoundError } = require("./errors");

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 3306,
};

// Connects to the database
async function connectToDb() {
  const connection = await mysql.createConnection(dbConfig);
  return connection;
}

// Retrieve user information based on the username provided
async function getUserByUsername(username) {
  const connection = await connectToDb();

  const sqlQuery = `SELECT * FROM User WHERE Username = ?;`;
  const params = [username];

  const [rows] = await connection.execute(sqlQuery, params);

  if (!rows) {
    throw new NotFoundError("Usuaŕio Não Encontrado.");
  }

  return rows[0];
}

async function addNewUser(username, password) {
  const connection = await connectToDb();

  const sqlQuery = `INSERT INTO User (UserID, Username, PasswordHash) VALUES (UUID(), ?, ?)`;
  const params = [username, password];

  const [result] = await connection.execute(sqlQuery, params);
}

exports.getUserByUsername = getUserByUsername;
exports.addNewUser = addNewUser;
