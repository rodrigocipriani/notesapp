const { User } = require("../models");

const service = {};
service.findOrCreate = async user => {
  return User.findOrCreate({
    where: { googleId: user.googleId },
    defaults: user
  });

  //   const newUser = await User.create(user);
  //   if (!!provider && !!newUser.id) {
  //     const userAuthProvider = {
  //       id: provider.id,
  //       userId: newUser.id,
  //       provider: provider.provider,
  //       data: provider
  //     };
  //     const isOk = await UserAuthProvider.upsert(userAuthProvider);
  //   }
  //   const theUser = await User.findOne({ where: { id: newUser.id } });
  //   return theUser;
};
module.exports = service;
