const passport = require("passport");
const config = require("../config");

const API_PREFIX = config.apiPrefix;

module.exports = app => {
  // GET /auth/google
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in Google authentication will involve
  //   redirecting the user to google.com.  After authorization, Google
  //   will redirect the user back to this application at /auth/google/callback
  app.route(`${API_PREFIX}/auth/google`).get(
    (req, res, next) => {
      const { redirect } = req.query;
      req.session.redirect = redirect;
      console.log("redirect", req.headers.referer);
      next();
    },
    passport.authenticate("google", {
      session: false,
      scope: ["https://www.googleapis.com/auth/plus.login"]
    })
  );
  // app.route(`${API_PREFIX}/auth/google`).get((req, res, next) => {
  //   const { redirect } = req.query;
  //   req.session.redirect = redirect;
  //   console.log("redirect", req.headers.referer);
  //   return passport.authenticate("google", {
  //     session: false,
  //     scope: ["https://www.googleapis.com/auth/plus.login"]
  //   });
  // });

  // GET /auth/google/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  app.route(`${API_PREFIX}/auth/google/callback`).get(
    passport.authenticate("google", {
      session: false,
      failureRedirect: "/login"
    }),
    function(req, res) {
      console.log(req.user);
      if (req.user) {
        // todo: Change to save in redis and return just a toke to client
        console.log(
          "!!!! todo: Change to save in redis and return just a toke to client"
        );
        req.session.user = req.user;
      }

      const redirect = req.session.redirect
        ? req.session.redirect
        : req.headers.referer;
      res.redirect(redirect);
      // res.redirect("/");
    }
  );
};
