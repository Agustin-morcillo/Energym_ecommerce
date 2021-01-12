const config = require("../config/config")

module.exports = (sequelize, dataTypes)=> {
    const alias = "Product";
    const cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.DECIMAL
        },
        introduction: {
            allowNull: false,
            type: dataTypes.STRING
        },
        description: {
            allowNull: false,
            type: dataTypes.TEXT
        },
        weight_KG: {
            allowNull: false,
            type: dataTypes.INTEGER
        },
        size: {
            allowNull: false,
            type: dataTypes.STRING
        },
        material: {
            allowNull: false,
            type: dataTypes.STRING
        },
        category: {
            allowNull: false,
            type: dataTypes.STRING
        },
        homepage: {
            allowNull: false,
            type: dataTypes.BOOLEAN
        },
        image: {
            allowNull: false,
            type: dataTypes.STRING
        },
        created_at: {
            type: dataTypes.DATE
        },
        updated_at: {
            type: dataTypes.DATE
        },
        deleted_at: {
            type: dataTypes.DATE
        }
    };

    const config = {
        tableName: "products"
    };

    const Product = sequelize.define(alias, cols, config);

    return Product;


}