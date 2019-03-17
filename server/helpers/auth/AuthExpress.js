/**
 *  # Configuration:
 *   new AuthExpress(app, {
 *     authPath: "/api/auth",
 *     googleClientId: process.env.GOOGLE_CLIENT_ID,
 *     googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
 *     googleClientUrl: process.env.GOOGLE_REDIRECT_URL,
 *     authRedirectClientUrl:
 *       process.env.AUTH_REDIRECT_CLIENT_URL ||
 *       "http://localhost:3000/auth/receive",
 *     cache: {
 *       set: (name, value) => cache.set,
 *       get: name => cache.get
 *     }
 *   });
 *
 *  cache lib: ... expressCache?
 *
 *  # Endpoints
 *  `/{yourAuthPath}/google-auth/getUrl` Get Google login url
 *  `/{yourAuthPath}/user` Get Google login url
 *
 *  # Dependencies:
 *  cookie-parser, googleapis, uuid
 */

const cookieParser = require("cookie-parser");
const googleAuthRoutes = require("./google/googleAuthRoutes");
const authRoutes = require("./authRoutes");

module.exports = class AuthExpress {
  constructor(
    app,
    {
      authPath,
      cache,
      authRedirectClientUrl,
      cookieTokenName,
      googleClientId,
      googleClientSecret,
      googleClientUrl
    }
  ) {
    this.app = app;
    this.authPath = authPath || "/auth";
    this.redirectTo = authRedirectClientUrl || "/auth/receive";
    this.cookieTokenName = cookieTokenName || "x-auth-token";
    this.googleClientId = googleClientId;
    this.googleClientSecret = googleClientSecret;
    this.googleClientUrl = googleClientUrl;
    const cacheSystem = cache || {
      set: () =>
        console.error("Error: AuthExpress cache set() not configured!"),
      get: () => console.error("Error: AuthExpress cache get() not configured!")
    };

    app.use((req, res, next) => {
      if (!req.authExpress) {
        req.authExpress = {};
      }
      req.authExpress.cache = cacheSystem;
      next();
    });

    app.use(cookieParser());

    // The order makes difference
    this.initAppInterceptors();
    this.initRoutes();
  }

  initRoutes() {
    googleAuthRoutes(this.app, {
      authPath: this.authPath,
      redirectTo: this.redirectTo,
      googleClientId: this.googleClientId,
      googleClientSecret: this.googleClientSecret,
      googleClientUrl: this.googleClientUrl
    });

    authRoutes(this.app, {
      authPath: this.authPath
    });

    return true;
  }

  initAppInterceptors() {
    this.app.use(async (req, res, next) => {
      if (req.authExpress.cache) {
        if (!req.authExpress.user) {
          const token = req.cookies ? req.cookies[this.cookieTokenName] : null;
          console.log(`loading user ${token} from cache...`);

          if (token) {
            const user = await req.authExpress.cache.get(token);
            req.authExpress.user = user;
          }
        }
        next();
      }
    });
  }
};
