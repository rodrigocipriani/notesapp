const notesActionTypes = {
  NEW_NOTE: "NEW_NOTE"
};

// todo: Better to use "debounce"
export const newNote = content => ({
  type: notesActionTypes.NEW_NOTE,
  payload: content
});

export { notesActionTypes };
