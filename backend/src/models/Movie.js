const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

module.exports = (sequelize) => {
  class Movie extends Model {}

  Movie.init(
    {
      movie_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      release_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      rating: {
        type: DataTypes.DECIMAL(5, 4),
      },
      poster_path: {
        type: DataTypes.STRING(255),
      },
    },
    {
      sequelize,
      tableName: "Movie",
      timestamps: false,
    }
  );

  return Movie;
};

