const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const config = require("../../config");

module.exports = app => {
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
          const data = await app.service.user.findOrCreate(user);
          return done(null, data[0]);
        } catch (error) {
          console.error(`ERROR: ${error}`);
        }

        return done(null, false);
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
      try {
        let user = await app.cache.get("user");
        if (user) {
          return done(null, user);
        } else {
          console.log(
            `Session not found for user id: ${jwt_payload}. Loading by DB...`
          );
          user = await app.service.user.findByPk(jwt_payload);
          app.cache.set("user", user);
          if (user) {
            return done(null, user);
          }
        }
      } catch (error) {
        console.error(`ERROR: ${error}`);
      }
      return done(null, false);
    })
  );
};
