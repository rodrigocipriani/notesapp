import { connect } from "react-redux";
import { newNote, changeNote } from "./notesActions";
import NotesHome from "./NotesHome";

const mapStateToProps = ({ notesReducer }, ownProps) => {
  return {
    notes: notesReducer.notes
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  newNote: content => dispatch(newNote(content)),
  changeNote: (id, content) => dispatch(changeNote(id, content))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotesHome);
