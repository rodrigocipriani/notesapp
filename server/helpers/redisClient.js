const redis = require("redis");

let redisOptions = {
  host: process.env.REDIS_HOST || "",
  port: process.env.REDIS_PORT || "",
  pass: process.env.REDIS_PWD || ""
  // client: "",
  // ttl :  260
};

let redisClient = redis.createClient(redisOptions.port, redisOptions.host, {
  auth_pass: redisOptions.pass
  // no_ready_check: true
});
redisClient.on("error", function(err) {
  // console.log(
  //   "@@@@@@@@@@@@@@@@@@@@@@@",
  //   "Bonk. The worker framework cannot connect to redis, which might be ok on a dev server!"
  // );
  console.log("@@@@@@@@@@@@@@@@@@@@@@@", "Resque error : " + err);
  // redisClient.quit();
});
redisClient.on("idle", function(err) {
  // console.log(
  //   "@@@@@@@@@@@@@@@@@@@@@@@",
  //   "Redis queue is idle. Shutting down..."
  // );
  // redisClient.quit();
});
redisClient.on("end", function(err) {
  // console.log(
  //   "@@@@@@@@@@@@@@@@@@@@@@@",
  //   "Redis is shutting down. This might be ok if you chose not to run it in your dev environment"
  // );
});
redisClient.on("ready", function(err) {
  // console.log(
  //   "@@@@@@@@@@@@@@@@@@@@@@@",
  //   "Redis up! Now connecting the worker queue client..."
  // );
});

module.exports = { redisClient, redisOptions };
