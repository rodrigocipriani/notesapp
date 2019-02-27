const notesActionTypes = {
  NEW_NOTE: "NEW_NOTE",
  CHANGE_NOTE: "CHANGE_NOTE",
  RESET_LAST_NOTE_ID: "RESET_LAST_NOTE_ID"
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
