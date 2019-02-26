import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MoreVert from "@material-ui/icons/MoreVert";
import classes from "./NotesHome.module.css";
import NoteComponent from "./NoteComponent";

export default ({ notes, changeNote }) => {
  console.log("notes", notes);

  const [activeNote, setActiveNote] = useState(null);

  const handleClickNote = id => () => {
    console.log("id", id);
    setActiveNote(id);
  };

  const handleAddNewNote = () => () => {
    console.log("new note");
  };

  const handleChangeNote = id => event => {
    console.log("change note ", event.target.value);
    changeNote(id, event.target.value);
  };

  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <List className={classes.root}>
          {notes.map(note => (
            <ListItem
              key={note.id}
              role={undefined}
              dense
              button
              onClick={handleClickNote(note.id)}
            >
              {activeNote === note.id ? (
                <TextField
                  id={`textfield-${note.id}`}
                  label="Content"
                  multiline
                  rowsMax="4"
                  value={note.content}
                  onChange={handleChangeNote(note.id)}
                  margin="normal"
                />
              ) : (
                <ListItemText
                  className={classes.noteContent}
                  primary={note.content}
                />
              )}
              <ListItemSecondaryAction>
                <IconButton aria-label="Comments">
                  <MoreVert />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={12}>
        <Button color="primary" onClick={handleAddNewNote()}>
          Criar uma nota...
        </Button>
      </Grid>
    </Grid>
  );
};
