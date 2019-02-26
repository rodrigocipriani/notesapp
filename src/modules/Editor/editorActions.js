const editorActionTypes = {
  NEW_TEXT: "NEW_TEXT"
};

// todo: Better to use "debounce"
export const newText = text => ({
  type: editorActionTypes.NEW_TEXT,
  payload: text
});

export { editorActionTypes };
