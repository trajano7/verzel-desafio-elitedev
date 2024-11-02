const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

module.exports = (sequelize) => {
  class User extends Model {}

  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: DataTypes.CHAR(64),
        allowNull: false,
      },
      profile_is_private: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "User",
      timestamps: false,
    }
  );

  return User;
};

