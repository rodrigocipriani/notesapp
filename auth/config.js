const path = require("path");
require("dotenv").config();

// todo: Check other required variables
const jwtSecret = process.env.JWT_SECRET;
if (!process.env.JWT_SECRET) {
  console.error(
    "ERROR: You need to inform your JWT_SECRET on environment variables"
  );
}

module.exports = {
  apiPrefix: process.env.API_PREFIX || "/api",
  publicFolder: path.join(process.cwd(), "..", "client", "build"),
  corsOriginsAccept: [
    "http://localhost",
    "http://127.0.0.1",
    "http://localhost:3000",
    "http://127.0.0.1:3000"
  ],
  port: process.env.port || 4000,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  redisPwd: process.env.REDIS_PWD,
  sessionSecret: process.env.SESSION_SECRET,
  jwtSecret,
  postgresUser: process.env.POSTGRES_USER,
  postgresPwd: process.env.POSTGRES_PWD,
  postgresDB: process.env.POSTGRES_DB,
  postgresHost: process.env.POSTGRES_HOST,
  postgresPort: process.env.POSTGRES_PORT
};
