const { HttpError, NotAuthError } = require("../errors/errors");
const { getUserByUsername } = require("../services/userService");
const { isValidToken } = require("../utils/authentication");

// Middleware that checks the owner of the profile
async function checkProfileOwner(req, res, next) {
  const username = req.params.username;

  const isOwner = req.token && req.token.username === username;
  if (!req.isPrivate || isOwner) {
    next();
  } else {
    return next(new HttpError(403, "Access denied: This profile is private."));
  }
}

// Middleware that checks if profile is public or private
async function checkProfileVisibility(req, res, next) {
  const username = req.params["username"];

  try {
    let userData;
    userData = await getUserByUsername(username);
    req.isPrivate = userData.profile_is_private;
  } catch (error) {
    return next(error);
  }
  next();
}

// Middleware that checks if token is valid
function checkAuthenticationMiddleware(req, res, next) {
  if (typeof req.isPrivate !== 'undefined' && !req.isPrivate) {
    return next();
  }

  if (req.method === "OPTIONS") {
    return next();
  }

  if (!req.headers.authorization) {
    if (typeof req.isPrivate !== 'undefined') {
      return next();
    }
    console.log("Error (utils/authentication): auth header missing.");
    return next(new NotAuthError());
  }

  const authFragments = req.headers.authorization.split(" ");
  if (authFragments.length !== 2) {
    console.log("Error (utils/authentication): auth header invalid.");
    return next(new NotAuthError());
  }

  const authToken = authFragments[1];
  try {
    const token = isValidToken(authToken);
    req.token = token;
  } catch (error) {
    console.log("Error (utils/authentication): token invalid.");
    return next(new NotAuthError());
  }
  next();
}

function validateAuthPayload(req, res, next) {
  const { username, password } = req.body;

  const isValidUsername = username && typeof username === "string";
  const isValidPassword = password && typeof password === "string";

  if (!isValidUsername || !isValidPassword) {
    throw new HttpError(400, "Bad Request");
  }

  next();
}

module.exports = {
  checkProfileOwner,
  checkAuthenticationMiddleware,
  checkProfileVisibility,
  validateAuthPayload
};
