const express = require("express");
const session = require('express-session');
const passport = require("passport");
const path = require("path");
const authRoutes = require("./authRouter");
require("./auth");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "client")));

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

app.use("/", authRoutes);

app.listen(3333, () => {
  console.log("Server listening on port 3333");
});
