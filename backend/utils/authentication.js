require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");
const { compare, hash } = require("bcryptjs");
const { NotAuthError, NotFoundError } = require("./errors");
const { getUserByUsername } = require("./dbAccess");

const secretKey = process.env.SECRET_KEY || "You_Will_Never_Guess";

// Create a authentication token
function createToken(userID, username) {
  return sign({ userID, username }, secretKey, { expiresIn: "12h" });
}

// Validate the token
function isValidToken(token) {
  return verify(token, secretKey);
}

// Create a hash of the password
async function hashPassword(password) {
  const hashResult = await hash(password, 10);

  return hashResult;
}

// Verify if password is valid
async function isValidPassword(password, storedPassword) {
  return await compare(password, storedPassword);
}

// Middleware that checks if profile is public or private
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

// Middleware that checks the owner of the profile
async function checkProfileOwner(req, res, next) {
  const username = req.params.username;

  const isPublic = req.visibility === "public";
  const isOwner = req.token && req.token.username === username;
  if (isPublic || isOwner) {
    next();
  } 
  else {
    return res.status(403).json({
      message: "Access denied: This profile is private.",
    });
  }

}

// Middleware that checks if token is valid
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
