import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthPage from "../modules/Auth/AuthPage";
import NotesHome from "../modules/Notes/NotesHome";
import AuthGate from "../modules/Auth/AuthGate";

const urls = {
  home: {
    path: "/"
  },
  authReceive: {
    path: "/auth/receive"
  }
};

const RouterComponent = () => {
  const restrictPage = page => {
    return () => <AuthGate children={React.createElement(page, {})} />;
  };

  return (
    <Router>
      <Switch>
        <Route
          exact
          path={urls.home.path}
          component={restrictPage(NotesHome)}
        />
        <Route exact path={urls.authReceive.path} component={AuthPage} />
      </Switch>
    </Router>
  );
};

export default RouterComponent;
export { urls };
