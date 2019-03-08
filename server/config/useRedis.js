const redis = require("redis");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);

module.exports = app => {
  let options = {
    host: process.env.REDIS_HOST || "",
    port: process.env.REDIS_PORT || "",
    pass: process.env.REDIS_PWD || ""
    // client: "",
    // ttl :  260
  };

  let redisClient = redis.createClient(options.port, options.host, {
    auth_pass: options.pass,
    no_ready_check: true
  });

  options.client = redisClient;

  return app.use(
    session({
      // genid            : (req) => {
      //   if (req.headers.token) return req.headers.token;
      //   return uuidv4()
      // },
      //   resave           : false,
      //   saveUninitialized: false,
      //   name             : 'BWL'
      store: new RedisStore(options),
      secret: process.env.REDIS_SECRET,
      resave: false
    })
  );
};
