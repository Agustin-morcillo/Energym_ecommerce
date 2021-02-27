const config = require("../config/config")

module.exports = (sequelize, dataTypes)=> {
    const alias = "User";
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
        lastname: {
            allowNull: false,
            type: dataTypes.STRING
        },
        email: {
            allowNull: false,
            type: dataTypes.STRING,
            unique: true
        },
        password: {
            allowNull: false,
            type: dataTypes.STRING,
        },
        avatar: {
            allowNull: false,
            type: dataTypes.STRING
        },
        rol: {
            type: dataTypes.INTEGER
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
        tableName: "users",
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = function(models){
        User.belongsToMany(models.Product,
            {
              as: 'products',
              through: "user_product",
              foreignKey: "user_id",
              otherKey: "product_id"
            }
        );

        User.belongsToMany(models.Rutine,
            {
              as: 'rutines',
              through: "user_rutine",
              foreignKey: "user_id",
              otherKey: "rutine_id"
            }
        );

        User.hasMany(models.Contact,
                {
                  as: 'contact',
                  foreignKey: 'user_id'
                }
        );

        User.hasMany(models.Item,
            {
              as: 'items',
              foreignKey: 'user_id'
            }
        );

        User.hasMany(models.Order,
            {
              as: 'orders',
              foreignKey: 'user_id'
            }
        );
    }
    return User;
}