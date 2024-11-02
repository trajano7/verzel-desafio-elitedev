const { authenticateUser, registerUser, toggleVisibility } = require("../services/userService");
const { createToken } = require("../utils/authentication");

async function login(req, res, next) {
  const { username, password } = req.body;

  try {
    const user = await authenticateUser({
      username: username,
      password: password,
    });

    const token = createToken(user.user_id, username);
    res.status(201).json({
      message: "Login efetuado com sucesso.",
      token,
      isPrivate: user.profile_is_private,
    });
  } catch (error) {
    return next(error);
  }
}

async function register(req, res, next) {
  const { username, password } = req.body;

  try {
    const user = await registerUser({ username: username, password: password });

    const token = createToken(user.user_id, username);
    res.status(201).json({
      message: "Usuário cadastrado com sucesso.",
      token,
      isPrivate: user.profile_is_private,
    });
  } catch (error) {
    return next(error);
  }
}

async function changeVisibility(req, res, next) {
  const userID = req.token.userID;

  try {
    const newVisibility = await toggleVisibility(userID);
    res.json({
      message: "Favorite list visibility successfully changed.",
      newVisibility,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  login,
  register,
  changeVisibility
};
