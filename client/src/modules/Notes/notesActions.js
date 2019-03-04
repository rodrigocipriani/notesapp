import { appApi } from "../../shared/api";

const notesActionTypes = {
  LOAD_NOTES: "LOAD_NOTES",
  NEW_NOTE: "NEW_NOTE",
  CHANGE_NOTE: "CHANGE_NOTE",
  RESET_LAST_NOTE_ID: "RESET_LAST_NOTE_ID"
};

export const loadNotes = () => ({
  type: notesActionTypes.LOAD_NOTES,
  promise: appApi.get("/v1/note/list")
});

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
