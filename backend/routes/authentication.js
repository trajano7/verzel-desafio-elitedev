const express = require("express");
const {
  hashPassword,
  isValidPassword,
  createToken,
} = require("../utils/authUtils");
const {
  isValidLength,
  isValidUsername,
  validateAuthPayload,
} = require("../utils/validationUtils");
const { v4: uuidv4 } = require("uuid");
const {
  getUserByUsername,
  addNewUser,
  userExists,
} = require("../models/modelUser");

const router = express.Router();

// Route responsible for authenticate a user
router.post("/login", validateAuthPayload, async (req, res, next) => {
  const { username, password } = req.body;

  let userData;
  try {
    userData = await getUserByUsername(username);
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Credentials",
      errors: { credentials: "Nome de usuário ou senha inválidos" },
    });
  }

  const isPasswordValid = await isValidPassword(
    password,
    userData.PasswordHash
  );
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid Credentials",
      errors: { credentials: "Nome de usuário ou senha inválidos." },
    });
  }

  const profileVisibility = userData.ProfileVisibility;
  const token = createToken(userData.UserID, userData.Username);
  res.status(201).json({
    message: "Usuário logado com sucesso..",
    token,
    profileVisibility,
  });
});

// Route responsible for register a new user
router.post("/register", validateAuthPayload, async (req, res, next) => {
  const { username, password } = req.body;

  let errors = {};

  const isUsernameValid = isValidUsername(username);
  if (!isUsernameValid) {
    errors.username =
      "O nome de usuário deve ter de 3 a 20 caracteres, podendo conter apenas letras, números, '.', '_' e '-', sem espaços.";
  } else {
    const doesUserExist = await userExists(username);
    if (doesUserExist) {
      errors.username = "Nome de usuário já cadastrado.";
    }
  }

  if (!isValidLength(password, 5)) {
    errors.password = "Senha inválida. Deve conter no mínimo 5 caracteres.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Falha ao se registrar devido a erros de validação.",
      errors,
    });
  }

  const userID = uuidv4();
  try {
    await addNewUser(username, await hashPassword(password), userID);
  } catch (error) {
    return next(error);
  }

  // Criação do token e resposta de sucesso
  const token = createToken(userID, username);
  return res.status(201).json({
    message: "Usuário cadastrado com sucesso.",
    token,
    profileVisibility: "public",
  });
});

module.exports = router;
