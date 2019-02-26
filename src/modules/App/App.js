import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "../../shared/store";
import NotesContainer from "../Notes/NotesContainer";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NotesContainer />
      </Provider>
    );
  }
}

export default App;
