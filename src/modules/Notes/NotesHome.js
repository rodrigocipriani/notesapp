import React from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MoreVert from "@material-ui/icons/MoreVert";
import classes from "./NotesHome.module.css";

export default ({ notes, newNote }) => {
  console.log("notes", notes);

  const handleToggle = value => () => {
    console.log("value", value);
  };

  const handleAddNewNote = () => () => {
    console.log("new note");
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
              onClick={handleToggle(note.id)}
            >
              {/* <Checkbox
                checked={this.state.checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
              /> */}
              <ListItemText primary={note.content} />
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
