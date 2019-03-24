module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      //   underscored: true,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User.associate = function(models) {
    //   models.User.hasMany(models.Task);
  };

  return User;
};
