const express = require("express");
const userController = require("../controllers/userController");
const { validateAuthPayload, checkAuthenticationMiddleware } = require("../middlewares/authentication");

const router = express.Router();

// Route responsible for authenticate a user
router.post("/login", validateAuthPayload, userController.login);

// Route responsible for register a new user
router.post("/register", validateAuthPayload, userController.register);

// Change the visibility of a user profile
router.patch("/profile", checkAuthenticationMiddleware, userController.changeVisibility);

module.exports = router;
