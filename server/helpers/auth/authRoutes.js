module.exports = (app, { authPath }) => {
  console.log("@@@@@@@@@@@@@@@@ 11111111111", `${authPath}/v1/user`);

  app.route(`${authPath}/v1/user`).post((req, res) => {
    console.log("@@@@@@@@@@@@@@@@ 22222222222222", req.session.user);

    console.log("fdsa", req.session.user);

    res.status(200).send("fds");
  });
};
