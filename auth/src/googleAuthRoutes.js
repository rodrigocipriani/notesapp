const passport = require("passport");
const config = require("../config");

const API_PREFIX = config.apiPrefix;

module.exports = app => {
  // GET /auth/google
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in Google authentication will involve
  //   redirecting the user to google.com.  After authorization, Google
  //   will redirect the user back to this application at /auth/google/callback
  app.get(
    `${API_PREFIX}/auth/google`,
    passport.authenticate("google", {
      session: false,
      scope: ["https://www.googleapis.com/auth/plus.login"]
    })
  );

  // GET /auth/google/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  app.get(
    `${API_PREFIX}/auth/google/callback`,
    passport.authenticate("google", {
      session: false,
      failureRedirect: "/login"
    }),
    function(req, res) {
      res.redirect("/");
    }
  );
};
