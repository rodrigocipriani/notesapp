module.exports = app => {
  const service = {};
  const NoteModel = app.models.models.Note;

  service.listNote = () => {
    return NoteModel.findAll();
  };

  service.saveNote = note => {
    if (note.id) {
      return NoteModel.update(note, {
        where: { id: note.id },
        returning: true,
        plain: true
      });
    } else {
      return NoteModel.build(note).save();
    }
  };

  return service;
};
