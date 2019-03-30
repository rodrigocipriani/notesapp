const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const modRewrite = require("connect-modrewrite");
const helmet = require("helmet");
const compression = require("compression");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const ejs = require("ejs");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const config = require("./config");

module.exports = ({ app, redisStoreConfig }) => {
  app.use(cookieParser());
  app.set("trust proxy", 1); // trust first proxy
  const sessionConfig = {
    secret: config.sessionSecret,
    name: "uSession",
    resave: false,
    saveUninitialized: true
  };
  if (redisStoreConfig) {
    sessionConfig.store = new RedisStore(redisStoreConfig);
  }
  app.use(session(sessionConfig));
  app.set("views", "./src/views");
  app.engine("html", ejs.renderFile);
  app.set("view engine", "html");
  app.use(
    cors({
      origin: config.corsOriginsAccept,
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
  app.use(methodOverride());
  app.use(helmet.hidePoweredBy({ setTo: "Cobol" }));
};
