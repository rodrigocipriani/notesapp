import React, { Component } from "react";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";

class MyEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = editorState => {
      this.setState({ editorState });

      const rawEditorState = convertToRaw(editorState.getCurrentContent());
      props.onChange({ rawEditorState });
    };
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }
  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  }
  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        handleKeyCommand={this.handleKeyCommand}
        onChange={this.onChange}
      />
    );
  }
}

export default MyEditor;
