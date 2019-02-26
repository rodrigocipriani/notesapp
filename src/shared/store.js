import { combineReducers, createStore } from "redux";
import appReducer from "../modules/App/appReducer";
import editorReducer from "../modules/Editor/editorReducer";
import notesReducer from "../modules/Notes/notesReducer";

const reducers = combineReducers({ appReducer, editorReducer, notesReducer });

const store = createStore(reducers);

export default store;
