import { notesActionTypes } from "./notesActions";
const uuidv1 = require("uuid/v1");

const initialState = {
  // {id, content}
  notes: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case notesActionTypes.NEW_NOTE:
      const note = {
        id: uuidv1(),
        content: "",
        new: true
      };
      return { ...state, notes: [...state.notes, note] };

    case notesActionTypes.CHANGE_NOTE:
      const id = action.payload.id;
      const content = action.payload.content;
      const notes = state.notes.map(note => {
        if (id !== note.id) {
          return note;
        }
        return { ...note, content, new: false };
      });
      return { ...state, notes };

    case notesActionTypes.RESET_LAST_NOTE_ID:
      return { ...state, lastNoteId: null };

    default:
      return state;
  }
};
