module.exports = class CacheHelper {
  constructor(redisClient) {
    this.redisClient = redisClient;
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
