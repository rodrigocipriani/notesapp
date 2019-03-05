import { notesActionTypes } from "./notesActions";

const initialState = {
  // notes: {id, content}
  notes: [],
  activeNote: {},
  loading: {
    notes: false
  }
};

export default (state = initialState, action) => {
  if (action.error) {
    alert(action.error);
    return { ...state };
  }

  const type = action.type;

  if (type === notesActionTypes.LOAD_NOTES) {
    if (action.ready) {
      return {
        ...state,
        notes: action.payload.data,
        loading: { ...state.loading, notes: false }
      };
    }
    return { ...state, loading: { ...state.loading, notes: true } };
  }

  if (type === notesActionTypes.NEW_NOTE) {
    return { ...state, notes: [...state.notes, action.payload] };
  }

  if (type === notesActionTypes.SAVE_CONTENT) {
    return {
      ...state,
      activeNote: { ...state.activeNote, content: action.payload }
    };
  }

  if (
    type === notesActionTypes.SAVE_NOTE ||
    type === notesActionTypes.SAVE_AND_CLOSE_NOTE
  ) {
    if (action.ready) {
      const activeSavedNote = action.payload.data;
      if (type === notesActionTypes.SAVE_AND_CLOSE_NOTE) {
        const newNotes = state.notes.map(note => {
          if (note.id === activeSavedNote.id) {
            return activeSavedNote;
          }
          return note;
        });
        return { ...state, activeNote: {}, notes: newNotes };
      }
      return { ...state, activeNote: activeSavedNote };
    } else {
      const note = action.payload;
      note.unsavedChanges = true;
      return { ...state, activeNote: action.payload };
    }
  }

  return state;

  // switch (action.type) {
  //   case notesActionTypes.LOAD_NOTES:
  //     if (action.ready) {
  //       return {
  //         ...state,
  //         notes: action.payload.data,
  //         loading: { ...state.loading, notes: false }
  //       };
  //     }
  //     return { ...state, loading: { ...state.loading, notes: true } };

  //   case notesActionTypes.NEW_NOTE:
  //     return { ...state, notes: [...state.notes, action.payload] };

  //   case notesActionTypes.SAVE_NOTE:
  //     if (action.ready) {
  //       const note = action.payload.data;
  //       note.unsavedChanges = true;
  //       return { ...state, activeNote: note };
  //     } else {
  //       return { ...state, activeNote: action.payload };
  //     }

  //   case notesActionTypes.SAVE_AND_CLOSE_NOTE:
  //     if (action.ready) {
  //       return { ...state, activeNote: action.payload.data };
  //     } else {
  //       return { ...state, activeNote: action.payload };
  //     }

  //   case notesActionTypes.RESET_LAST_NOTE_ID:
  //     return { ...state, lastNoteId: null };

  //   default:
  //     return state;
  // }
};
