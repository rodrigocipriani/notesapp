const notesActionTypes = {
  NEW_NOTE: "NEW_NOTE",
  CHANGE_NOTE: "CHANGE_NOTE"
};

export const newNote = content => ({
  type: notesActionTypes.NEW_NOTE,
  payload: content
});

// todo: Better to use "debounce"
export const changeNote = (id, content) => ({
  type: notesActionTypes.CHANGE_NOTE,
  payload: { id, content }
});

export { notesActionTypes };
