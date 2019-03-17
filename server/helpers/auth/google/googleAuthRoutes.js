const uuidv4 = require("uuid/v4");
const googleAuthUtils = require("./googleAuthUtils");

module.exports = (
  app,
  { authPath, redirectTo, googleClientId, googleClientSecret, googleClientUrl }
) => {
  const { urlGoogle, getGoogleAccountFromCode } = googleAuthUtils({
    googleClientId,
    googleClientSecret,
    googleClientUrl
  });

  app.route(`${authPath}/google-auth/getUrl`).get((req, res, next) => {
    const urlGoogleString = urlGoogle();

    res.status(200).send(urlGoogleString);
    // res.redirect(urlGoogle);
  });

  app.route(`${authPath}/google-auth`).get(async (req, res, next) => {
    const { code } = req.query;
    try {
      const info = await getGoogleAccountFromCode(code);

      const token = uuidv4();

      const user = {
        token,
        provider: "google",
        info
      };

      // todo: set a expire time
      req.authExpress.cache.set(token, user);
      res.cookie("x-auth-token", token);
      res.redirect(`${redirectTo}`);
      // res.status(200).send({ token });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  });
};
