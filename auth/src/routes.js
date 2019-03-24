const config = require("../config");
const userRoutes = require("./user/userRoutes");
const noteRoutes = require("./note/noteRoutes");
const googleAuthRoutes = require("./auth/googleAuthRoutes");

const API_PREFIX = config.apiPrefix;

const PUBLIC_ROUTES = ["/api/auth/google", "/api/auth/google/callback"];

const isRequiredAuth = req => PUBLIC_ROUTES.indexOf(req.path) < 0;

const init = app => {
  app.route(`${API_PREFIX}/`).get((req, res) => {
    res.status(200).json("Hello World!");
  });

  userRoutes(app);
  noteRoutes(app);
  googleAuthRoutes(app);
};

module.exports = { init, isRequiredAuth };
