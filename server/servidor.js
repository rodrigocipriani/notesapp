const http = require("http");
const app = require("./config/express")();
const cluster = require("cluster");
const config = require("./config");

const env = config.env;
const isProduction = process.env.NODE_ENV === "production";

if (cluster.isMaster && isProduction) {
  // Count the machine's CPUs
  const workers = require("os").cpus().length;

  // Create a worker for each CPU
  for (let i = 0; i < workers; i += 1) {
    cluster.fork();
  }
} else {
  http.createServer(app).listen(app.get("port"), () => {
    console.log(`Server listen on port ${app.get("port")}`); // eslint-disable no-console
    console.log(`Runing in ${process.env.NODE_ENV || "Development"}`);
  });
}
