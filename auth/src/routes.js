const config = require("../config");
const googleAuthRoutes = require("./googleAuthRoutes");

const API_PREFIX = config.apiPrefix;

const PUBLIC_ROUTES = ["/api/auth/google", "/api/auth/google/callback"];

const isRequiredAuth = req => PUBLIC_ROUTES.indexOf(req.path) < 0;

const init = app => {
  app.route(`${API_PREFIX}/`).get((req, res) => {
    res.status(200).json("Hello World!");
  });
  app.route(`${API_PREFIX}/auth/user`).get((req, res) => {
    console.log("$$$$$$$$$1111");
    res.status(200).json(req.session.user);
  });
  app.route(`${API_PREFIX}/v1/note/list`).get((req, res) => {
    res.status(200).json([]);
  });

  googleAuthRoutes(app);
};

module.exports = { init, isRequiredAuth };
