const { User } = require("../models");

const service = {};
service.add = user => {
  return User.create(user);
};
module.exports = service;
