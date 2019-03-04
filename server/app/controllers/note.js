module.exports = app => {
  const NoteService = app.services.note;
  const controller = {};

  controller.listNote = (req, res, next) => {
    console.log("Oiiiiiiiiiiiiiii");
    return NoteService.listNote()
      .then(notes => {
        res.status(200).send(notes);
      })
      .catch(err => {
        console.error("aqui", err);
        return next(err);
      });
  };

  return controller;
};
