module.exports = (app, { authPath }) => {
  app.route(`${authPath}/user`).get(async (req, res) => {
    res.status(200).send(req.authExpress.user);
  });
};
