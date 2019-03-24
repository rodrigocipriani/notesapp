const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
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
      return done(null, { id: 1, name: "Rodrigo Cipriani da Rosa" });
      // User.findOrCreate({ googleId: profile.id }, function(err, user) {
      //   return done(err, user);
      // });
    }
  )
);

const cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["Authorization"];
  }
  console.log(`######### trying by cookie`, token);
  return token;
};
const opts = {};
opts.jwtFromRequest = cookieExtractor;
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwtSecret;
// console.error("!!!! todo: change issuer and audience");
// opts.issuer = "accounts.examplesoft.com";
// opts.audience = "yoursite.net";

passport.use(
  "jwt",
  new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(`@@@jwt_payload`, jwt_payload);
    const user = {};
    return done(null, user);
    // User.findOne({ id: jwt_payload.sub }, function(err, user) {
    //   if (err) {
    //     return done(err, false);
    //   }
    //   if (user) {
    //     return done(null, user);
    //   } else {
    //     return done(null, false);
    //     // or you could create a new account
    //   }
    // });
  })
);