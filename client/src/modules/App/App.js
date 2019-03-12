import React, { Component } from "react";
import { Provider } from "react-redux";
import { store /*persistor*/ } from "../../shared/store/store";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import RouterComponent from "../../shared/RouterComponent";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <AppBar position="static">
          <Toolbar>
            <Typography type="title" color="inherit">
              Notes by Cipriani
            </Typography>
          </Toolbar>
        </AppBar>
        <RouterComponent />
        {/* <NotesHome /> */}
        {/* </PersistGate> */}
      </Provider>
    );
  }
}

export default App;
