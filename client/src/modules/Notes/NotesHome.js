import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { newNote, changeNote, loadNotes } from "./notesActions";
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
import { Paper, Typography } from "@material-ui/core";

const NotesHome = ({ notes, changeNote, newNote, loadNotes, loading }) => {
  const [activeNote, setActiveNote] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      loadNotes();
      setInitialized(true);
    }
  });

  const handleClickNote = id => () => {
    // console.log("id", id);
    setActiveNote(id);
  };

  const handleExitNote = id => () => {
    // console.log("id", id);
    if (activeNote === id) {
      setActiveNote(null);
    }
  };

  const handleAddNewNote = () => () => {
    newNote();
  };

  const handleChangeNote = note => event => {
    // console.log("change note ", event.target.value);
    if (note.new) {
      setActiveNote(note.id);
    }
    changeNote(note.id, event.target.value);
  };
  console.log("loading.notes", loading.notes);
  return (
    <Grid container spacing={8}>
      {loading.notes && (
        <Grid item xs={12}>
          <Typography variant="caption" gutterBottom>
            Atualizando...
          </Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        <List className={classes.root}>
          {notes.map(note => (
            <Paper key={note.id} className={classes.paper}>
              <ListItem
                key={note.id}
                role={undefined}
                dense
                button
                onClick={handleClickNote(note.id)}
              >
                {activeNote === note.id || note.new ? (
                  <TextField
                    id={`textfield-${note.id}`}
                    // label="Content"
                    multiline
                    autoFocus
                    fullWidth
                    // rowsMax="4"
                    value={note.content}
                    onChange={handleChangeNote(note)}
                    margin="normal"
                    onBlur={handleExitNote(note.id)}
                    className={classes.noteTextField}
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
            </Paper>
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

const mapStateToProps = ({ notesReducer }, ownProps) => {
  return {
    notes: notesReducer.notes,
    loading: notesReducer.loading
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  newNote: content => dispatch(newNote(content)),
  changeNote: (id, content) => dispatch(changeNote(id, content)),
  loadNotes: () => dispatch(loadNotes())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotesHome);
