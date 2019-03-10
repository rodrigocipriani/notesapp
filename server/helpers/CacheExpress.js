const redis = require("redis");

module.exports = class CacheExpress {
  constructor() {
    let redisOptions = {
      host: process.env.REDIS_HOST || "",
      port: process.env.REDIS_PORT || "",
      pass: process.env.REDIS_PWD || ""
      // client: "",
      // ttl :  260
    };

    this.redisClient = redis.createClient(
      redisOptions.port,
      redisOptions.host,
      {
        auth_pass: redisOptions.pass,
        no_ready_check: true
      }
    );
  }

  set(key, data) {
    return this.redisClient.set(key, JSON.stringify(data));
  }

  get(key) {
    return new Promise((resolve, reject) => {
      this.redisClient.get(key, (err, reply) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(JSON.parse(reply));
      });
    });
  }
};
