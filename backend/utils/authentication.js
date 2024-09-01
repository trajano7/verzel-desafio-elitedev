require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");
const { compare, hash } = require("bcryptjs");
const { NotAuthError, NotFoundError } = require("./errors");
const { getUserByUsername } = require("./dbAccess");

const secretKey = process.env.SECRET_KEY || "You_Will_Never_Guess";

function createToken(userID, username) {
  return sign({ userID, username }, secretKey, { expiresIn: "1h" });
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

async function checkProfileVisibility(req, res, next) {
  const username = req.params["username"];

  try {
    let userData;
    userData = await getUserByUsername(username);
    req.visibility = userData.ProfileVisibility;
  } catch (error) {
    return next(error);
  }
  next();
}

async function checkProfileOwner(req, res, next) {
  const username = req.params.username;

  const isPrivate = req.visibility === "private";
  if (
    (!req.token && isPrivate) ||
    (isPrivate && req.token.username !== username)
  ) {
    return res.status(403).json({
      message: "Access denied: This profile is private.",
    });
  }
  next();
}

function checkAuthenticationMiddleware(req, res, next) {
  if (req.visibility && req.visibility === "public") {
    return next();
  }

  if (req.method === "OPTIONS") {
    return next();
  }

  if (!req.headers.authorization) {
    if (req.visibility) {
      return next();
    }
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
exports.checkProfileVisibility = checkProfileVisibility;
exports.checkProfileOwner = checkProfileOwner;
