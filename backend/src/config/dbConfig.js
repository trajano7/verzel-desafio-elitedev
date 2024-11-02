require("dotenv").config();

module.exports = {
  secretKey: process.env.SECRET_KEY || "You_Will_Never_Guess",
  dbConfig: {
    dbName: process.env.DB_NAME || "movies_db",
    dbUser: process.env.DB_USER || "root",
    dbPassword: process.env.DB_PASSWORD || "123",
    dbHost: process.env.DB_HOST || "localhost",
    dbDialect: process.env.DB_DIALECT || "mysql",
  },
};
