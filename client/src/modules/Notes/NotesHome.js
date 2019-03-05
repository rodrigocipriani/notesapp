import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { newNote, saveNote, loadNotes, saveContent } from "./notesActions";
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
import useDebounce from "../../shared/debounceHook";

const DEBOUNCE_DELAY = 500;

const NotesHome = ({
  notes,
  saveNote,
  newNote,
  loadNotes,
  loading,
  activeNote,
  saveContent
}) => {
  const [initialized, setInitialized] = useState(false);

  const debounceActiveNote = useDebounce(activeNote, DEBOUNCE_DELAY);

  useEffect(() => {
    if (!initialized) {
      loadNotes();
      setInitialized(true);
    }
  });

  useEffect(() => {
    if (debounceActiveNote && activeNote && activeNote.content) {
      saveNote(activeNote);
    }
  }, [debounceActiveNote]);

  const handleSelectNote = note => () => {
    saveNote(note);
  };

  const handleExitNote = () => () => {
    saveNote(activeNote, true);
  };

  const handleAddNewNote = () => () => {
    const note = {
      id: null,
      content: ""
    };
    newNote(note);
  };

  const handleChangeNote = event => {
    saveContent(event.target.value);
  };

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
                onClick={handleSelectNote(note)}
              >
                {activeNote.id === note.id || note.new ? (
                  <TextField
                    id={`textfield-${note.id}`}
                    // label="Content"
                    multiline
                    autoFocus
                    fullWidth
                    // rowsMax="4"
                    value={activeNote.content}
                    onChange={handleChangeNote}
                    margin="normal"
                    onBlur={handleExitNote(note)}
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
    activeNote: notesReducer.activeNote,
    loading: notesReducer.loading
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  newNote: note => dispatch(newNote(note)),
  saveContent: content => dispatch(saveContent(content)),
  saveNote: (note, close = false) => dispatch(saveNote(note, close)),
  loadNotes: () => dispatch(loadNotes())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotesHome);
