const { HttpError } = require("../errors/errors");
const { User } = require("../models");
const { isValidPassword, hashPassword } = require("../utils/authentication");
const { isValidUsername, isValidLength } = require("../utils/validation");

async function getUserByUsername(username) {
    const user = await User.findOne({ where: { username: username } });

    if (!user)
      throw new HttpError(404, "User not found.")

    return user;
}

async function authenticateUser({ username, password }) {
  const user = await User.findOne({ where: { username: username } });

  if (!user || !(await isValidPassword(password, user.password_hash))) {
    throw new HttpError(401, "Nome de usuário ou senha inválidos.");
  }

  return user;
}

async function getUserById(userID) {
  const user = await User.findOne({ where: { user_id: userID } });

  if (!user) {
    throw new HttpError(404, "Usuário não encontrado.")
  }

  return user;
}

async function registerUser({ username, password }) {
  let errors = {};

  if (!isValidUsername(username)) {
    errors.username =
      "O nome de usuário deve ter de 3 a 20 caracteres, podendo conter apenas letras, números, '.', '_' e '-', sem espaços.";
  } 
  else {
    const usernameExists = await User.findOne({ where: { username } });
    if (usernameExists) {
      errors.username = "Nome de usuário já cadastrado.";
    }
  }

  if (!isValidLength(password, 5))
    errors.password = "Senha inválida. Deve conter no mínimo 5 caracteres.";

  if (Object.keys(errors).length > 0) {
    throw new HttpError(
      422,
      "Falha ao se registrar devido a erros de validação.",
      errors
    );
  }

  const user = await User.create({
    username,
    password_hash: await hashPassword(password)
  });

  return user;
}

async function toggleVisibility(userID) {
  const user = await getUserById(userID);
  const newVisibility = !user.profile_is_private;
  await user.update({ profile_is_private: newVisibility });

  return newVisibility;
}

module.exports = {
  authenticateUser,
  registerUser,
  getUserByUsername,
  getUserById,
  toggleVisibility
};

