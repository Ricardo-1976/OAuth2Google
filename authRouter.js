const express = require("express");
const passport = require("passport");
const authController = require("./authController");

const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get("/auth/google/callback", authController.googleCallback);

router.get("/auth/protected", authController.isLoggedIn, authController.protectedRoute);

router.get("/auth/google/failure", (req, res) => {
  res.send("Something went wrong");
});

module.exports = router;
