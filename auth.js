import { use, serializeUser, deserializeUser } from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
require("dotenv").config();
use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3333/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

serializeUser((user,done) => {
  done(null,user)
});

deserializeUser((user,done) => {
  done(null,user);
})


