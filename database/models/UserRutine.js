const config = require("../config/config")

module.exports = (sequelize, dataTypes) => {
  const alias = "UserRutine"
  const cols = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER,
    },
    rutineId: {
      type: dataTypes.INTEGER,
      references: { model: "Rutine", key: "id" },
    },
    userId: {
      type: dataTypes.INTEGER,
      references: { model: "User", key: "id" },
    },
  }

  const config = {
    tableName: "user_rutine",
  }

  const UserRutine = sequelize.define(alias, cols, config)

  UserRutine.associate = function (models) {
    UserRutine.belongsTo(models.Rutine, {
      foreignKey: "rutine_id",
    })

    UserRutine.belongsTo(models.User, {
      foreignKey: "user_id",
    })
  }
  return UserRutine
}
