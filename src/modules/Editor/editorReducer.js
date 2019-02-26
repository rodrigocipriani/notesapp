import { editorActionTypes } from "./editorActions";

const initialState = {
  text: "# aaaaaaaaaaaaa"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case editorActionTypes.NEW_TEXT:
      // console.log("action", action);
      return { ...state, text: action.payload };
    default:
      return state;
  }
};
