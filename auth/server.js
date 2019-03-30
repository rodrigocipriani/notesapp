const express = require("express");
const config = require("./config");
const routesConfig = require("./src/routesConfig");
const redisHelpers = require("./helpers/redisHelpers");
const CacheHelper = require("./helpers/CacheHelper");
const passport = require("passport");
const passportStrategies = require("./src/auth/passportStrategies");
const models = require("./src/models");
const appBootModules = require("./src/appBootModules");
const serverDefaultModulesBoot = require("./serverDefaultModulesBoot");

// Express Best practices security
// https://expressjs.com/en/advanced/best-practice-security.html

const cache = new CacheHelper(redisHelpers.redisClient());

const server = () => {
  const app = express();

  /**
   * Models
   */
  app.models = models;

  /**
   * Redis
   */
  // app.redisClient = redisHelpers.redisClient();

  /**
   * Cache
   */
  app.cache = cache;

  /**
   * Boot commom used modules for express
   */
  serverDefaultModulesBoot({
    app,
    redisStoreConfig: redisHelpers.redisOptions
  });

  /**
   * Configuring passport and Authentication
   */
  passportStrategies(app);
  app.use(passport.initialize());
  app.use((req, res, next) => {
    if (!routesConfig.isRequiredAuth(req)) {
      return next();
    }
    return passport.authenticate("jwt", { session: false })(req, res, next);
  });

  /**
   * Boot modules cotrollers, services, routes, middlewares...
   */
  appBootModules({ app });

  /**
   * Exception router catcher
   */
  app.get("*", (req, res) => {
    const msg = "Route/path not found";
    console.log(msg);
    if (req.xhr) return res.status(404).send({ message: msg });
    return res.status(404).render("404.ejs");
  });
  app.use((err, req, res) => {
    console.log("Express general error", err);

    let error = err;
    let msg;
    let status = 500;

    if (error.stack) {
      const message = msg || "Erro interno do servidor";
      return res.status(status).send({
        message,
        messageCode: new Date()
      });
    }
  });

  /**
   * Starting server
   */
  app.listen(config.port, () =>
    console.log(`Server listening on port ${config.port}!`)
  );
};

server();
