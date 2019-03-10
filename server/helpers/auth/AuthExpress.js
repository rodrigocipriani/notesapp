const googleAuthRoutes = require("./google/googleAuthRoutes");
const authRoutes = require("./authRoutes");

module.exports = class AuthExpress {
  constructor(app, { authPath, redisClient, redirectTo }) {
    this.app = app;
    this.authPath = authPath || "/auth";
    this.redirectTo = redirectTo || "/auth/receive";
    this.redisClient = redisClient;
    this.initRoutes();
    this.initAppInterceptors();
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
        console.log("########## req.session.user", req.session.user);
        if (!req.session.user) {
          const { token } = req.headers || req.body || req.query || req.params;
          console.log("########## token", req.headers);
          console.log(`loading user ${token} from cache...`);

          if (token) {
            const user = await req.cache.get(token);
            console.log("########## user", user);
            req.session.user = user;
          }
        }
        next();
      });
    }
  }
};
