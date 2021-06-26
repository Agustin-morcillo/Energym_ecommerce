const config = require("../config/config")

module.exports = (sequelize, dataTypes) => {
  const alias = "Order"
  const cols = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER,
    },
    orderNumber: {
      allowNull: false,
      type: dataTypes.INTEGER,
      unique: true,
    },
    total: {
      type: dataTypes.DECIMAL,
    },
    userId: {
      allowNull: false,
      type: dataTypes.INTEGER,
      references: { model: "User", key: "id" },
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
    tableName: "orders",
  }

  const Order = sequelize.define(alias, cols, config)

  Order.associate = function (models) {
    Order.hasMany(models.Item, {
      as: "items",
      foreignKey: "order_id",
    })

    Order.belongsTo(models.User, {
      as: "users",
      foreignKey: "user_id",
    })
  }
  return Order
}
