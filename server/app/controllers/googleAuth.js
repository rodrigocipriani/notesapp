const googleAuthUtils = require("../auth/google/googleAuthUtils");

module.exports = app => {
  // const NoteService = app.services.note;
  const controller = {};

  controller.getGoogleAuthUrl = (req, res, next) => {
    const urlGoogle = googleAuthUtils.urlGoogle();
    // console.log("req.session.urlGoogle", req.session.urlGoogle);
    // req.session.urlGoogle = urlGoogle;
    res.status(200).send(urlGoogle);
  };

  controller.receiveGoogleCode = async (req, res, next) => {
    const { code } = req.query;
    try {
      const info = await googleAuthUtils.getGoogleAccountFromCode(code);
      // res.redirect('/foo/bar');
      // req.session.user;
      res.status(200).send(info);
    } catch (error) {
      console.error(error);
      return next(error);
    }
  };

  return controller;
};
