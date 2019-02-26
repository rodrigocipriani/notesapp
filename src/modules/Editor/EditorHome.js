import React from "react";
import Grid from "@material-ui/core/Grid";
import Markdown from "markdown-to-jsx";
import EditorComponent from "./EditorComponent";

export default ({ text, newText }) => {
  console.log("text", text);

  return (
    <Grid container spacing={8}>
      <Grid item xs={6}>
        <EditorComponent onChange={text => newText(text)} />
      </Grid>
      <Grid item xs={6}>
        <Markdown>{text}</Markdown>
      </Grid>
    </Grid>
  );
};
