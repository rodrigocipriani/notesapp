require("dotenv").config();
const path = require("path");

module.exports = {
  authRedirectClientUrl:
    process.env.AUTH_REDIRECT_CLIENT_URL ||
    "http://localhost:3000/auth/receive",
  publicFolder: path.join(process.cwd(), "..", "client", "build"),
  corsOriginsAccept: [
    "http://localhost",
    "http://127.0.0.1",
    "http://localhost:3000",
    "http://127.0.0.1:3000"
  ],
  port: 4000,
  postgres: {
    usuario: process.env.POSTGRES_USER || "postgres",
    senha: process.env.POSTGRES_PWD || "postgrespwd",
    db: process.env.POSTGRES_DB || "postgresdb",
    config: {
      host: process.env.POSTGRES_HOST || "postgreshost",
      port: process.env.POSTGRES_PORT || 5432,
      dialect: "postgres",
      dialectOptions: {
        ssl: true
      },
      operatorsAliases: false,
      freezeTableName: true,
      define: { timestamps: false },
      pool: {
        maxConnections: 10,
        minConnections: 0,
        maxIdleTime: 60
      }
    }
  }
};
