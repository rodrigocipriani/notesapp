import { combineReducers, createStore } from "redux";
import appReducer from "../modules/App/appReducer";
import editorReducer from "../modules/Editor/editorReducer";
import notesReducer from "../modules/Notes/notesReducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "../modules/Weather/rootReducer";

const persistConfig = {
  key: "root",
  storage
};

const reducers = combineReducers({
  rootReducer,
  appReducer,
  editorReducer,
  notesReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

let store = createStore(persistedReducer);
let persistor = persistStore(store);

export { store, persistor };
