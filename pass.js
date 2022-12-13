const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "317589194816-1ou1ul1fvt6j45bphofkdce6bbula9ib.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
