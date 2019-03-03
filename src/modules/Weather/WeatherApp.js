import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { urls } from "./urls";
import WeatherComponent from "./WeatherComponent";

const WeatherApp = () => {
  return (
    <Router>
      <Route path={urls.home.path} component={WeatherComponent} />
    </Router>
  );
};

export default WeatherApp;
