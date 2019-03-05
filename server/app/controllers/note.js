module.exports = app => {
  const NoteService = app.services.note;
  const controller = {};

  controller.listNote = (req, res, next) => {
    return NoteService.listNote()
      .then(notes => {
        res.status(200).send(notes);
      })
      .catch(err => {
        console.error("Error: ", err);
        return next(err);
      });
  };

  controller.saveNote = (req, res, next) => {
    const { id, content } = req.body;
    const note = { id, content };
    return NoteService.saveNote(note)
      .then(data => {
        // In postgres we can get object back from db
        res.status(200).send(data[1] ? data[1].dataValues : data);
      })
      .catch(err => {
        console.error("Error: ", err);
        return next(err);
      });
  };

  return controller;
};
