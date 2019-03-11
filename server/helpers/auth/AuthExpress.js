const googleAuthRoutes = require("./google/googleAuthRoutes");
const authRoutes = require("./authRoutes");

module.exports = class AuthExpress {
  constructor(app, { authPath, redisClient, redirectTo }) {
    this.app = app;
    this.authPath = authPath || "/auth";
    this.redirectTo = redirectTo || "/auth/receive";
    this.redisClient = redisClient;

    // The order makes difference
    this.initAppInterceptors();
    this.initRoutes();
  }

  initRoutes() {
    googleAuthRoutes(this.app, {
      authPath: this.authPath,
      redirectTo: this.redirectTo
    });

    authRoutes(this.app, {
      authPath: this.authPath
    });

    return true;
  }

  initAppInterceptors() {
    if (this.redisClient) {
      this.app.use(async (req, res, next) => {
        if (!req.session.user) {
          const token = req.headers["x-auth-token"];
          console.log(`loading user ${token} from cache...`);

          if (token) {
            const user = await req.cache.get(token);
            req.session.user = user;
          }
        }
        next();
      });
    }
  }
};
