module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    "Note",
    {
      id: {
        type: DataTypes.INTEGER,
        underscored: true,
        autoIncrement: true,
        primaryKey: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
        underscored: true
      },
      created_at: {
        type: DataTypes.DATE,
        underscored: true,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    },
    {
      tableName: "note",
      schema: "notes"
    }
  );

  return Note;
};
