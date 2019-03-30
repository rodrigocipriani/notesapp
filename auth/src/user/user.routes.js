const config = require("../../config");
const models = require("../models");

const API_PREFIX = config.apiPrefix;

module.exports = app => {
  app.route(`${API_PREFIX}/auth/user`).get(async (req, res) => {
    const user = await app.cache.get("user");
    res.status(200).json(user);
    // res.status(200).json(req.session.user);
  });
};
