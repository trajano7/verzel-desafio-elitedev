const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Movie = require("./Movie");

module.exports = (sequelize) => {
  class Favorite extends Model {}

  Favorite.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: "user_id",
        },
        primaryKey: true,
      },
      movie_id: {
        type: DataTypes.BIGINT,
        references: {
          model: Movie,
          key: "movie_id",
        },
        primaryKey: true,
      },
    },
    {
      sequelize,
      tableName: "Favorite",
      timestamps: false,
    }
  );

  return Favorite;
};

