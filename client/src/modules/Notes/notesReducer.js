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
  const type = action.type;

  if (type === notesActionTypes.LOAD_NOTES) {
    if (action.error) {
      return { ...state, loading: { ...state.loading, notes: false } };
    }
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
    if (action.error) {
      return { ...state };
    }
    return {
      ...state,
      notes: [action.payload, ...state.notes],
      activeNote: action.payload
    };
  }

  if (type === notesActionTypes.SAVE_CONTENT) {
    if (action.error) {
      return { ...state };
    }
    return {
      ...state,
      activeNote: {
        ...state.activeNote,
        content: action.payload,
        unsavedChanges: true
      }
    };
  }

  if (
    type === notesActionTypes.SAVE_NOTE ||
    type === notesActionTypes.SAVE_AND_CLOSE_NOTE
  ) {
    if (action.error) {
      return { ...state };
    }
    if (action.ready) {
      const activeSavedNote = action.payload.data;

      if (type === notesActionTypes.SAVE_AND_CLOSE_NOTE) {
        const newNotes = state.notes.map(note => {
          if (note.id === activeSavedNote.id) {
            return activeSavedNote;
          }
          return note;
        });
        return {
          ...state,
          activeNote:
            activeSavedNote.id === state.activeNote.id ? {} : state.activeNote,
          notes: newNotes
        };
      }
      const retorno = {
        ...state,
        activeNote: {
          ...state.activeNote,
          unsavedChanges: false
        }
      };
      if (!state.activeNote.id) {
        retorno.activeNote.id = activeSavedNote.id;

        const newNotesWithId = state.notes.map(note => {
          if (note.id === state.activeNote.id) {
            note.id = activeSavedNote.id;
            return note;
          }
          return note;
        });

        retorno.notes = newNotesWithId;
      }
      return retorno;
    } else {
      const note = action.payload;
      note.unsavedChanges = true;
      return { ...state, activeNote: action.payload };
    }
  }

  return state;
};
