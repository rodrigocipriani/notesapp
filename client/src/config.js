require("dotenv").config();

module.exports = {
  apiUrl: process.env.REACT_APP_API_URL || "http://localhost:4000/api"
};
