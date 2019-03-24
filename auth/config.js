const path = require("path");
require("dotenv").config();

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
  jwtSecret
};
