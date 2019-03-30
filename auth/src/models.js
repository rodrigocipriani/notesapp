var path = require("path");
var Sequelize = require("sequelize");
var config = require("../config");
var db = {};

const sequelize = new Sequelize(
  config.postgresDB,
  config.postgresUser,
  config.postgresPwd,
  {
    host: config.postgresHost,
    dialect: "postgres",
    port: config.postgresPort || 5432,
    dialectOptions: {
      ssl: true
    },
    freezeTableName: true,
    define: { timestamps: false },
    pool: {
      maxConnections: 10,
      minConnections: 0,
      maxIdleTime: 60
    }
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Postgres connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database Postgres:", err);
  });

const models = [];

models.push("./user/UserModel.js");

models.forEach(file => {
  var model = sequelize["import"](path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize.sync();
// sequelize.sync({ force: true });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
