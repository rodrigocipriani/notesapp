const uuidv4 = require("uuid/v4");
const googleAuthUtils = require("./googleAuthUtils");

getGoogleAuthUrl = (req, res, next) => {
  const urlGoogle = googleAuthUtils.urlGoogle();

  res.status(200).send(urlGoogle);
  // res.redirect(urlGoogle);
};

receiveGoogleCode = redirectTo => async (req, res, next) => {
  const { code } = req.query;
  try {
    const info = await googleAuthUtils.getGoogleAccountFromCode(code);

    const token = uuidv4();

    const user = {
      token,
      provider: "google",
      info
    };

    req.session.user = user;

    // store user in cache by token in case user have token and not session
    // todo: set a expire time
    req.cache.set(token, user);

    res.redirect(`${redirectTo}?token=${token}`);
    // res.status(200).send({ token });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

module.exports = { getGoogleAuthUrl, receiveGoogleCode };
