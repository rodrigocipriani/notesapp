const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const config = require("../../config");
const UserService = require("../user/UserService");

const passportStrategies = app => {
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
      async function(accessToken, refreshToken, profile, done) {
        const user = {
          id: null,
          name: profile.displayName,
          googleId: profile.id
        };

        try {
          const data = await UserService.findOrCreate(user);
          return done(null, data[0]);
        } catch (error) {
          console.error(`ERROR: ${error}`);
        }

        return done(null, false);

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
    new JwtStrategy(opts, async function(jwt_payload, done) {
      console.log(`@@@jwt_payload`, jwt_payload);
      console.error(
        "TODO: Testar quando perder o usuário do CACHE buscar no DB"
      );
      let user = await app.cache.get("user");
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
      console.log(`@@@user`, user);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  );
};

module.exports = passportStrategies;
