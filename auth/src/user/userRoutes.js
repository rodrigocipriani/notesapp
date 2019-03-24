const config = require("../../config");

const API_PREFIX = config.apiPrefix;

module.exports = app => {
  app.route(`${API_PREFIX}/auth/user`).get(async (req, res) => {
    console.log("2222 ??");
    const user = await app.cache.get("user");
    console.log("2222 user", user);
    res.status(200).json(user);
    // res.status(200).json(req.session.user);
  });
};
