const config = require("../config/config")

module.exports = (sequelize, dataTypes) => {
  const alias = "Product"
  const cols = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    price: {
      type: dataTypes.DECIMAL,
    },
    introduction: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    description: {
      allowNull: false,
      type: dataTypes.TEXT,
    },
    weightKg: {
      allowNull: false,
      type: dataTypes.INTEGER,
    },
    size: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    material: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    category: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    homepage: {
      allowNull: false,
      type: dataTypes.BOOLEAN,
    },
    image: {
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
    tableName: "products",
  }

  const Product = sequelize.define(alias, cols, config)

  Product.associate = function (models) {
    Product.belongsToMany(models.User, {
      as: "users",
      through: "user-product",
      foreignKey: "product_id",
      otherKey: "user_id",
    })
  }
  return Product
}
