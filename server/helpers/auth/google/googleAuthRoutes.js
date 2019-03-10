const {
  getGoogleAuthUrl,
  receiveGoogleCode
} = require("./googleAuthController");

module.exports = (app, { authPath, redirectTo }) => {
  app.route(`${authPath}/v1/google-auth/getUrl`).get(getGoogleAuthUrl);
  app.route(`${authPath}/google-auth`).get(receiveGoogleCode(redirectTo));
};
