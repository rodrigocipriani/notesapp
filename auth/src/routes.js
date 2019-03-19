const config = require("../config");
const googleAuthRoutes = require("./googleAuthRoutes");

const API_PREFIX = config.apiPrefix;

module.exports = app => {
  app.route(`${API_PREFIX}/`).get((req, res) => {
    res.status(200).json("Hello World!");
  });
  app.route(`${API_PREFIX}/auth/user`).get((req, res) => {
    res.status(200).json(null);
  });
  app.route(`${API_PREFIX}/v1/note/list`).get((req, res) => {
    res.status(200).json([]);
  });

  googleAuthRoutes(app);
};
