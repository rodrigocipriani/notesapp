const path = require("path");

module.exports = {
  publicFolder: path.join(process.cwd(), "..", "client", "build"),
  corsOriginsAccept: [
    "http://localhost",
    "http://127.0.0.1",
    "http://localhost:3000",
    "http://127.0.0.1:3000"
  ],
  port: 4000,
  postgres: {
    usuario: "lqoupxuo",
    senha: "h5ct8bGxXvy9uyyjz2FotS8Ynt4or-lm",
    db: "lqoupxuo",
    config: {
      host: "stampy.db.elephantsql.com",
      port: 5432,
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
  },
  tokenSecret: "R#3@qICGjbCE0J#H8@2Y",
  lib: {
    bcrypt: "bcrypt"
  }
};
