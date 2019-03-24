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
const config = require("./config");
const routes = require("./src/routes");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const redisHelpers = require("./redisHelpers");
const passport = require("passport");
require("./src/passportStrategies");

// Express Best practices security
// https://expressjs.com/en/advanced/best-practice-security.html

const server = () => {
  const app = express();

  // app.redisClient = redisHelpers.redisClient();
  app.use(cookieParser());
  app.set("trust proxy", 1); // trust first proxy
  app.use(
    session({
      store: new RedisStore(redisHelpers.redisOptions),
      secret: "j l543e3 5#%@35 #% 32o5 jk23 ç54l2 3kj45ç 23lk",
      name: "uSession",
      resave: false,
      saveUninitialized: true
    })
  );
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
  app.use(passport.initialize());
  app.use((req, res, next) => {
    if (!routes.isRequiredAuth(req)) {
      return next();
    }
    return passport.authenticate("jwt", { session: false })(req, res, next);
  });

  routes.init(app);

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

  app.listen(config.port, () =>
    console.log(`Server listening on port ${config.port}!`)
  );
};

server();
