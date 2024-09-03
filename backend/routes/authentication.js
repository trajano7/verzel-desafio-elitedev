const express = require("express");
const {
  hashPassword,
  isValidPassword,
  createToken,
} = require("../utils/authentication");
const { getUserByUsername, addNewUser } = require("../utils/dbAccess");
const { isValidLength, isValidUsername, validateAuthPayload } = require("../utils/validation");
const { v4: uuidv4 } = require('uuid');

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


  const isPasswordValid = await isValidPassword(password, userData.PasswordHash);
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid Credentials",
      errors: { credentials: "Nome de usuário ou senha inválidos." },
    });
  }

  const profileVisibility = userData.ProfileVisibility
  const token = createToken(userData.UserID, userData.Username);
  res.status(201).json({ message: "Usuário logado com sucesso..", token, profileVisibility });
});

// Route responsible for register a new user
router.post("/register", validateAuthPayload,  async (req, res, next) => {
  const { username, password } = req.body;

  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa4")

  let errors = {};
  const isUsernameValid = isValidUsername(username);
  if (!isUsernameValid) {
    errors.username =
      "O nome de usuário é inválido. Deve ter entre 3 e 20 caracteres e pode conter apenas letras, números, pontos, underscores e hífens. Não pode conter espaços em branco.";
  }

  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa3")

  try {
    if (isUsernameValid) {
      const userExists = await getUserByUsername(username);
      if (userExists) {
        errors.username = "O nome de usuário já existe.";
      }
    }
  } catch (error) {}

  if (!isValidLength(password, 5)) {
    errors.password = "Senha inválida. Deve conter no mínimo 5 caracteres.";
  }

  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa2")

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Falha ao se registrar devido a erros de validação.",
      errors,
    });
  }

  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa1")

  const userID = uuidv4();
  try {
    await addNewUser(username, await hashPassword(password), userID);
  } catch (error) {
    next(error);
  }

  const token = createToken(userID, username);
  return res.status(201).json({ message: "Usuário cadastrado com sucesso.", token, profileVisibility: "public" });
});

module.exports = router;
