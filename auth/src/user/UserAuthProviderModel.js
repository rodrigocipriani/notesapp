module.exports = (sequelize, DataTypes) => {
  var UserAuthProvider = sequelize.define(
    "UserAuthProvider",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        comment: "ID from the provider"
      },
      userId: {
        type: DataTypes.INTEGER,
        // underscored: true,
        primaryKey: true,
        comment: "Unique ID for de User"
      },
      provider: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Provider name. (google, facebook, etc...)"
      },
      data: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: "Json data from provider login"
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE
    },
    {
      tableName: "userAuthProvider",
      schema: "notes",
      underscored: true
    }
  );

  // UserAuthProvider.associate = function(models) {
  //   models.UserAuthProvider.hasOne(models.User);
  // };

  return UserAuthProvider;
};
