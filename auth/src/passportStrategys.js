var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const config = require("../config");
console.log("config", config);

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(
  new GoogleStrategy(
    {
      clientID: config.googleClientId,
      clientSecret: config.googleClientSecret,
      callbackURL: config.googleCallbackUrl
    },
    function(accessToken, refreshToken, profile, done) {
      return done(null, {});
      // User.findOrCreate({ googleId: profile.id }, function(err, user) {
      //   return done(err, user);
      // });
    }
  )
);
