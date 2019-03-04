module.exports = app => {
  const service = {};
  const NoteModel = app.models.models.Note;

  service.listNote = () => {
    return NoteModel.findAll();
  };

  return service;
};
