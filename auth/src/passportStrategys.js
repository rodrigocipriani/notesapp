var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const config = require("../config");

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
      console.log("## ", profile);
      return done(null, { user: "test" });
      // User.findOrCreate({ googleId: profile.id }, function(err, user) {
      //   return done(err, user);
      // });
    }
  )
);
