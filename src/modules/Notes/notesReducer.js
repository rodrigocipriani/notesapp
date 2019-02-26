import { notesActionTypes } from "./notesActions";

const initialState = {
  notes: [
    {
      id: 0,
      content: "aaa"
    }
  ]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case notesActionTypes.NEW_NOTE:
      // console.log("action", action);
      const note = {
        id: state.notes[state.notes.length - 1].id + 1,
        content: action.payload
      };
      return { ...state, notes: [...state.notes, note] };
    case notesActionTypes.CHANGE_NOTE:
      const id = action.payload.id;
      const content = action.payload.content;
      const notes = state.notes.map(note => {
        if (id !== note.id) {
          return note;
        }
        return { ...note, content };
      });
      return { ...state, notes };
    default:
      return state;
  }
};
