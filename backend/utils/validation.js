function isValidString(text, minLength = 1) {
  return text && text.trim().length >= minLength;
}

function isValidUsername(username, maxLength = 20) {
  // Verificar comprimento
  if (!isValidString(username) || username.trim().length > maxLength) {
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

exports.isValidString = isValidString;
exports.isValidUsername = isValidUsername;
