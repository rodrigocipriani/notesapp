const defaultConfig = require("./ambiente/.config.default");
const development = require("./ambiente/.config.development") || {};
const production = require("./ambiente/.config.production") || {};

const env = {
  isDevelopment: false,
  isProduction: false
};

const environment = process.env.NODE_ENV || "";

let theEnv = {};

switch (environment) {
  case "production":
    env.isProduction = true;
    theEnv = production;
    break;
  default:
    // case 'development':
    env.isDevelopment = true;
    theEnv = development;
    break;
}

theEnv.env = env;
export default { ...defaultConfig, ...theEnv };
