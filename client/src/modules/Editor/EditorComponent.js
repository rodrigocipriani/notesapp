import React from "react";
import { draftToMarkdown } from "markdown-draft-js";
import EditorDraft from "./EditorDraft";

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = ({ rawEditorState }) => {
      const markdownString = draftToMarkdown(rawEditorState);
      console.log("markdownString", markdownString);
      props.onChange(markdownString);
    };
  }

  render() {
    return <EditorDraft onChange={this.onChange} />;
  }
}

export default MyEditor;
