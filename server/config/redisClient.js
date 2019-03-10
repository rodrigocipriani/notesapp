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

module.exports = redisClient;
