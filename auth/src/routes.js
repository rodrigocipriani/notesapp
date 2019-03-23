const config = require("../config");
const googleAuthRoutes = require("./googleAuthRoutes");

const API_PREFIX = config.apiPrefix;

module.exports = app => {
  app.route(`${API_PREFIX}/`).get((req, res) => {
    res.status(200).json("Hello World!");
  });
  app.route(`${API_PREFIX}/auth/user`).get((req, res) => {
    console.log("@@@ req.user", req.session.user);
    res.status(200).json(req.session.user);
  });
  app.route(`${API_PREFIX}/v1/note/list`).get((req, res) => {
    res.status(200).json([]);
  });

  googleAuthRoutes(app);
};
