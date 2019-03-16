module.exports = (app, { authPath }) => {
  app.route(`${authPath}/v1/user`).get((req, res) => {
    // console.log("User: ", req.session.user);

    res.status(200).send(req.session.user);
  });
};
