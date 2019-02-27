import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "../../shared/store";
import NotesHome from "../Notes/NotesHome";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NotesHome />
      </Provider>
    );
  }
}

export default App;
