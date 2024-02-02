const passport = require("passport");

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

function protectedRoute(req, res) {
  let name = req.user.displayName;
  let email = req.user.email;
  res.send(`Hello ${name} </br> email ${email}`);
}

function googleCallback(req, res, next) {
  passport.authenticate("google", {
    successRedirect: "/auth/protected",
    failureRedirect: "/auth/google/failure",
  })(req, res, next);
}

module.exports = {
  isLoggedIn,
  protectedRoute,
  googleCallback,
};
