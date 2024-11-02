const sequelize = require('../config/database');

const defineUser = require("./User");
const defineMovie = require("./Movie");
const defineFavorite = require("./Favorite");

defineUser(sequelize);
defineMovie(sequelize);
defineFavorite(sequelize);

const { User, Movie, Favorite } = sequelize.models;

User.belongsToMany(Movie, { through: Favorite, foreignKey: 'user_id' });
Movie.belongsToMany(User, { through: Favorite, foreignKey: 'movie_id' });

const syncModels = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Modelos sincronizados com sucesso.');
  } catch (error) {
    console.error('Erro ao sincronizar os modelos:', error);
  }
};

module.exports = { User, Movie, Favorite, syncModels };
