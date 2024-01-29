const express = require("express");
const passport = require("passport");
const session = require('express-session');
const path = require("path");
const app = express();
require("./auth");
app.use(express.json());
app.use(express.static(path.join(__dirname, "client")));

function isLoggedIn(req,res,next){
  req.user ? next() : res.sendStatus(401);
}

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.use(
  session({
    secret: 'mysecret',
    resava: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/protected",
    failureRedirect: "/auth/google/failure",
  })
);

app.get('/auth/protected',isLoggedIn, (req,res) => {
  let name = req.user.displayName;
  let email = req.user.email;
  res.send(`Hello ${name} </br> email ${email}`);
})

app.get('/auth/google/failure', (req,res) => {
  res.send('Semething went wrong ');
})

app.listen(3333, () => {
  console.log("Servodor port :: 3333");
});
