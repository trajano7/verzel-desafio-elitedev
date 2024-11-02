const { Sequelize } = require('sequelize');
const { dbConfig } = require("../../config");

const sequelize = new Sequelize(dbConfig.dbName, dbConfig.dbUser, dbConfig.dbPassword, {
  host: dbConfig.dbHost,
  dialect: dbConfig.dbDialect,
});

module.exports = sequelize;