const { User } = require("../models");

module.exports = app => {
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

  app.service.user = service;
  return true;
};
