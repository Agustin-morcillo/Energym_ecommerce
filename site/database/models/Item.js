const config = require("../config/config")

module.exports = (sequelize, dataTypes)=> {
    const alias = "Item";
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
        quantity: {
            allowNull: false,
            type: dataTypes.INTEGER
        },
        image: {
            allowNull: false,
            type: dataTypes.STRING
        },
        total: {
            allowNull: false,
            type: dataTypes.INTEGER
        },
        userId: {
            allowNull: false,
            type: dataTypes.INTEGER,
            references: {model: "User", key: "id"}
        },
        orderId: {
            allowNull: false,
            type: dataTypes.INTEGER,
            references: {model: "Order", key: "id"}
        },
        createdAt: {
            type: dataTypes.DATE
        },
        updatedAt: {
            type: dataTypes.DATE
        },
        deletedAt: {
            type: dataTypes.DATE
        }
    };

    const config = {
        tableName: "items",
    };

    const Item = sequelize.define(alias, cols, config);

    Item.associate = function(models){
       Item.belongsTo(models.User,{
           as: "user",
           foreignKey: 'user_id'
       })
    }

    Item.associate = function(models){
        Item.belongsTo(models.Order,{
            as: "order",
            foreignKey: 'order_id'
        })
     }
    return Item;
}