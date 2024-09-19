function isValidLength(text, minLength = 1) {
  return text && text.trim().length >= minLength;
}

function isValidUsername(username, maxLength = 20) {
  // Verificar comprimento
  if (!isValidLength(username) || username.trim().length > maxLength) {
    return false;
  }

  // Verificar caracteres permitidos (letras, números, pontos, underscores e hífens)
  const allowedCharacters = /^[a-zA-Z0-9._-]+$/;
  if (!allowedCharacters.test(username)) {
    return false;
  }

  // Verificar espaços dentro do nome de usuário
  if (/\s/.test(username)) {
    return false;
  }

  // Se todas as verificações passarem
  return true;
}

function validateAuthPayload(req, res, next) {
  const { username, password } = req.body;

  const isValidUsername = username && typeof username === "string";
  const isValidPassword = password && typeof password === "string";

  if (!isValidUsername || !isValidPassword) {
    return res.status(400).json({ message: "Bad Request" });
  }

  next();
}

function isValidProfileVisibility(value) {
  const validValues = ["public", "private"];
  return validValues.includes(value);
}

exports.isValidLength = isValidLength;
exports.isValidUsername = isValidUsername;
exports.validateAuthPayload = validateAuthPayload;
exports.isValidProfileVisibility = isValidProfileVisibility;
