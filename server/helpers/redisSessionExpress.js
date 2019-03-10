const redis = require("redis");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);

module.exports = (app, redisClient) => {
  return app.use(
    session({
      // genid            : (req) => {
      //   if (req.headers.token) return req.headers.token;
      //   return uuidv4()
      // },
      //   resave           : false,
      //   saveUninitialized: false,
      //   name             : 'BWL'
      store: new RedisStore({ client: redisClient }),
      secret: process.env.REDIS_SECRET,
      resave: false
    })
  );
};
