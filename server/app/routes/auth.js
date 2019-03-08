module.exports = app => {
  const controller = app.controllers.googleAuth;

  app.route(`/api/google-auth`).get(controller.receiveGoogleCode);
  app.route(`/api/v1/google-auth/geturl`).get(controller.getGoogleAuthUrl);
};
