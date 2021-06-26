const config = require("../config/config")

module.exports = (sequelize, dataTypes) => {
  const alias = "UserProduct"
  const cols = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER,
    },
    productId: {
      type: dataTypes.INTEGER,
      references: { model: "Product", key: "id" },
    },
    userId: {
      type: dataTypes.INTEGER,
      references: { model: "User", key: "id" },
    },
  }

  const config = {
    tableName: "user_product",
  }

  const UserProduct = sequelize.define(alias, cols, config)

  UserProduct.associate = function (models) {
    UserProduct.belongsTo(models.Product, {
      foreignKey: "product_id",
    })

    UserProduct.belongsTo(models.User, {
      foreignKey: "user_id",
    })
  }
  return UserProduct
}
