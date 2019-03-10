import React, { Component } from "react";
import { Provider } from "react-redux";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import { store /*persistor*/ } from "../../shared/store/store";
import NotesHome from "../Notes/NotesHome";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import { PersistGate } from "redux-persist/integration/react";
import AuthGate from "../Auth/AuthGate";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <AuthGate>
          <AppBar position="static">
            <Toolbar>
              <Typography type="title" color="inherit">
                Notes by Cipriani
              </Typography>
            </Toolbar>
          </AppBar>
          {/* <Router>
      <Route path={urls.home.path} component={WeatherComponent} />
    </Router> */}
          <NotesHome />
        </AuthGate>
        {/* </PersistGate> */}
      </Provider>
    );
  }
}

export default App;
