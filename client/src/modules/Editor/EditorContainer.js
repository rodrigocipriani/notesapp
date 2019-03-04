import { connect } from "react-redux";
import { newText } from "./editorActions";
import EditorHome from "./EditorHome";

const mapStateToProps = ({ editorReducer }, ownProps) => {
  return {
    text: editorReducer.text
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  newText: text => dispatch(newText(text))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorHome);
