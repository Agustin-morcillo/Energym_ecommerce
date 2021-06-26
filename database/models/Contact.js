const config = require("../config/config")

module.exports = (sequelize, dataTypes) => {
  const alias = "Contact"
  const cols = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER,
    },
    isRegistered: {
      allowNull: false,
      type: dataTypes.BOOLEAN,
    },
    userId: {
      type: dataTypes.INTEGER,
    },
    email: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    subject: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    body: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    createdAt: {
      type: dataTypes.DATE,
    },
    updatedAt: {
      type: dataTypes.DATE,
    },
    deletedAt: {
      type: dataTypes.DATE,
    },
  }

  const config = {
    tableName: "contact",
  }

  const Contact = sequelize.define(alias, cols, config)

  Contact.associate = function (models) {
    Contact.belongsTo(models.User, {
      as: "users",
      foreignKey: "user_id",
    })
  }
  return Contact
}
