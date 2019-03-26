module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        //   underscored: true,
        autoIncrement: true,
        primaryKey: true,
        comment: "Unique ID for de User"
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "User name"
      }
    },
    {
      tableName: "user",
      schema: "notes"
    }
  );

  User.associate = function(models) {
    //   models.User.hasMany(models.Task);
  };

  return User;
};
