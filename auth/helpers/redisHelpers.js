const redis = require("redis");
const config = require("../config");

let redisOptions = {
  host: config.redisHost || "",
  port: config.redisPort || "",
  pass: config.redisPwd || ""
  // client: "",
  // ttl :  260
};

const redisClient = () => {
  let redisCli = redis.createClient(redisOptions.port, redisOptions.host, {
    auth_pass: redisOptions.pass
    // no_ready_check: true
  });
  redisCli.on("error", function(err) {
    // console.log(
    //   "@@@@@@@@@@@@@@@@@@@@@@@",
    //   "Bonk. The worker framework cannot connect to redis, which might be ok on a dev server!"
    // );
    console.log("@@@@@@@@@@@@@@@@@@@@@@@", "Resque error : " + err);
    // redisClient.quit();
  });
  redisCli.on("end", function(err) {
    // console.log(
    //   "@@@@@@@@@@@@@@@@@@@@@@@",
    //   "Redis is shutting down. This might be ok if you chose not to run it in your dev environment"
    // );
  });
  redisCli.on("ready", function(err) {
    // console.log(
    //   "@@@@@@@@@@@@@@@@@@@@@@@",
    //   "Redis up! Now connecting the worker queue client..."
    // );
  });
  return redisCli;
};

module.exports = { redisClient, redisOptions };
