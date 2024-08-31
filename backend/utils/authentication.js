require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");
const { compare, hash } = require("bcryptjs");
const { NotAuthError } = require("./errors");

const secretKey = process.env.SECRET_KEY || "You_Will_Never_Guess";

function createToken(userID) {
  return sign({ userID }, secretKey, { expiresIn: "1h" });
}

function isValidToken(token) {
  return verify(token, secretKey);
}

async function hashPassword(password) {
  const hashResult = await hash(password, 10);

  return hashResult;
}

async function isValidPassword(password, storedPassword) {
  return await compare(password, storedPassword);
}

function checkAuthenticationMiddleware(req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }

  if (!req.headers.authorization) {
    console.log("Error (utils/authentication): auth header missing.");
    return next(new NotAuthError("Not authenticated."));
  }

  const authFragments = req.headers.authorization.split(" ");
  if (authFragments.length !== 2) {
    console.log("Error (utils/authentication): auth header invalid.");
    return next(new NotAuthError("Not authenticated."));
  }

  const authToken = authFragments[1];
  try {
    const token = isValidToken(authToken);
    req.token = token;
  } catch (error) {
    console.log("Error (utils/authentication): token invalid.");
    return next(new NotAuthError("Not authenticated."));
  }
  next();
}

exports.createToken = createToken;
exports.isValidToken = isValidToken;
exports.hashPassword = hashPassword;
exports.isValidPassword = isValidPassword;
exports.isValidPassword = isValidPassword;
exports.checkAuthMiddleware = checkAuthenticationMiddleware;

