const { User } = require("../models");

const service = {};

service.findOrCreate = async user => {
  return User.findOrCreate({
    where: { googleId: user.googleId },
    defaults: user
  });
};

service.findByPk = async userId => {
  return User.findByPk(userId);
};

module.exports = service;
