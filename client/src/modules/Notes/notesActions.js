import { appApi } from "../../shared/api";

const notesActionTypes = {
  LOAD_NOTES: "LOAD_NOTES",
  NEW_NOTE: "NEW_NOTE",
  SAVE_CONTENT: "SAVE_CONTENT",
  SAVE_NOTE: "SAVE_NOTE",
  SAVE_AND_CLOSE_NOTE: "SAVE_AND_CLOSE_NOTE",
  RESET_LAST_NOTE_ID: "RESET_LAST_NOTE_ID"
};

export const loadNotes = () => ({
  type: notesActionTypes.LOAD_NOTES,
  promise: appApi.get("/v1/note/list")
});

export const newNote = note => ({
  type: notesActionTypes.NEW_NOTE,
  payload: note
});

export const saveContent = content => ({
  type: notesActionTypes.SAVE_CONTENT,
  payload: content
});

export const saveNote = (note, close = false) => ({
  type: close
    ? notesActionTypes.SAVE_AND_CLOSE_NOTE
    : notesActionTypes.SAVE_NOTE,
  promise: appApi.post("/v1/note/save", note),
  payload: note
});

export { notesActionTypes };
