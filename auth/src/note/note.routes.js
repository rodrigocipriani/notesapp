const config = require("../../config");

const API_PREFIX = config.apiPrefix;

module.exports = app => {
  app.route(`${API_PREFIX}/v1/note/list`).get((req, res) => {
    res.status(200).json([]);
  });
};
