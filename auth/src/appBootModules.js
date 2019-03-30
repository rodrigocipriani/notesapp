const path = require("path");
const filterFiles = require("filter-files");
const isDir = require("is-directory");
const isRoutes = fileName => /((routes)|(route))\.js$/.test(fileName);
const isController = fileName => /((controller))\.js$/.test(fileName);
const isService = fileName => /((service))\.js$/.test(fileName);
const isMidlleware = fileName => /((middleware))\.js$/.test(fileName);

const appBootModules = ({ app, dirname = path.join(__dirname, "./") }) => {
  const getRoutesFilesFromDirname = dirname => {
    return filterFiles.sync(
      dirname,
      (fp, dir, files, recurse) => {
        if (
          isRoutes(fp) ||
          isController(fp) ||
          isService(fp) ||
          isMidlleware(fp)
        ) {
          return true;
        }

        return isDir.sync(path.join(dir, fp));
      },
      true
    );
  };

  console.log(`# Botting modules from dir ${dirname}...`);
  getRoutesFilesFromDirname(dirname).forEach(fileName => {
    app.controller = {};
    app.service = {};
    app.middleware = {};
    if (isRoutes(fileName)) {
      console.log("# botting routes", fileName);
      require(fileName)(app);
    }
    if (isController(fileName)) {
      console.log("# botting controller", fileName);
      require(fileName)(app);
    }
    if (isService(fileName)) {
      console.log("# botting service", fileName);
      require(fileName)(app);
    }
    if (isMidlleware(fileName)) {
      console.log("# botting middleware", fileName);
      require(fileName)(app);
    }
  });
  console.log(`# Modules booted!`);
};

module.exports = appBootModules;
