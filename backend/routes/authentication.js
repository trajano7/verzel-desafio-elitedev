const express = require("express");
const { v4: uuidv4 } = require("uuid");
const {
  hashPassword,
  isValidPassword,
  createToken,
} = require("../utils/authentication");
const { getUserByUsername, addNewUser } = require("../utils/dbAccess");
const { isValidString, isValidUsername } = require("../utils/validation");

const router = express.Router();

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  let userData;
  try {
    userData = await getUserByUsername(username);
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Credentials",
      errors: { credentials: "Invalid username or password entered." },
    });
  }

  const isPasswordValid = await isValidPassword(password, userData.PasswordHash);
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid Credentials",
      errors: { credentials: "Invalid username or password entered." },
    });
  }

  const token = createToken(userData.UserID);
  res.json({ token });
});

// username e password
// se nao existe um usuario com mesmo nome
// verificar se a senha esta buena
// verificar se o nome e usuario esta bueno
// hash da senha
// armazenar
// return
router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  let errors = {};
  const isUsernameValid = isValidUsername(username);
  if (!isUsernameValid) {
    errors.username =
      "O nome de usuário é inválido. Deve ter entre 3 e 20 caracteres e pode conter apenas letras, números, pontos, underscores e hífens. Não pode conter espaços em branco.";
  }

  try {
    if (isUsernameValid) {
      const userExists = await getUserByUsername(username);
      if (userExists) {
        errors.username = "O nome de usuário já existe.";
      }
    }
  } catch (error) {}

  if (!isValidString(password, 5)) {
    errors.password = "Senha inválida. Deve conter no mínimo 5 caracteres.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Falha ao se registrar devido a erros de validação.",
      errors,
    });
  }

  try {
    await addNewUser(username, await hashPassword(password));
    res.status(201).json({ message: "Usuário cadastrado com sucesso." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
