const path = require("path");
const config = require("../config");
const express = require("express");
const cors = require("cors");
const consign = require("consign");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const compression = require("compression");
const modRewrite = require("connect-modrewrite");
const morgan = require("morgan");
const ejs = require("ejs");

const redisSessionExpress = require("../helpers/redisSessionExpress");
const AuthExpress = require("../helpers/auth/AuthExpress");
const CacheExpress = require("../helpers/CacheExpress");
const redis = require("redis");

let redisOptions = {
  host: process.env.REDIS_HOST || "",
  port: process.env.REDIS_PORT || "",
  pass: process.env.REDIS_PWD || ""
  // client: "",
  // ttl :  260
};

let redisClient = redis.createClient(redisOptions.port, redisOptions.host, {
  auth_pass: redisOptions.pass,
  no_ready_check: true
});

module.exports = () => {
  const app = express();

  /**
   *
   * !!!!!!!!!!!!!!!!
   *
   * Review and encapsulat all
   *
   * !!!!!!!!!!!!!!
   */

  const port = process.env.PORT || config.port;
  app.set("port", port);

  app.set("views", "./app/views");
  app.engine("html", ejs.renderFile);
  app.set("view engine", "html");

  app.use(
    cors({
      origin: config.corsOriginsAccept,
      allowedHeaders: ["x-auth-token", "Content-Type", "Authorization"],
      exposedHeaders: "x-auth-token",
      //  additionalHeaders: ['cache-control', 'x-requested-with'],
      credentials: true
    })
  );

  app.use(
    modRewrite([
      "!\\api/|\\.html|\\.js|\\.svg|\\.css|\\.png|\\.jpg|\\.woff|\\.woff2|\\.ttf|\\.manifest$ /index.html [L]"
    ])
  );

  app.use(express.static(config.publicFolder));

  app.use(compression());
  app.use(morgan("dev"));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(require("method-override")());
  app.use(helmet.hidePoweredBy({ setTo: "Cobol" }));

  app.use((req, res, next) => {
    const cache = new CacheExpress();
    req.cache = cache;
    next();
  });

  /**
   * Configure redis
   */
  redisSessionExpress(app, redisClient);

  /**
   * Configure Auth
   */
  const authExpress = new AuthExpress(app, {
    authPath: "/api/auth",
    redirectTo: config.authRedirectClientUrl,
    redisClient
  });

  /**
   * Consign modules
   */
  consign({ cwd: path.join(process.cwd(), /*"server",*/ "app") })
    .include("models/models.js")
    .then("utils")
    .then("services")
    .then("controllers")
    .then("routes")
    .into(app);

  app.get("*", (req, res) => {
    console.log("Route/path not found");
    if (req.xhr)
      return res.status(404).send({ message: "Endereço inexistente" });
    return res.status(404).render("404.ejs");
  });

  // app.use(erro.handler({token: config.accessToken}));

  app.use((err, req, res) => {
    console.log("Express general error", err);

    let error = err;
    let msg;
    let status = 500;

    if (err.constructor.name === "BrError") {
      error = err.error;
      msg = typeof err.message === "string" ? err.message : err.message.message;
      status = err.params.status || 500;
    }

    if (error.stack) {
      const message = msg || "Erro interno do servidor";
      return res.status(status).send({
        message,
        messageCode: new Date()
      });
    }
  });

  return app;
};
