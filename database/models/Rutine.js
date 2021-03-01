const config = require("../config/config")

module.exports = (sequelize, dataTypes)=> {
    const alias = "Rutine";
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
        duration_weeks: {
            allowNull: false,
            type: dataTypes.INTEGER
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
        tableName: "rutines",
    };

    const Rutine = sequelize.define(alias, cols, config);

    Rutine.associate = function(models){
        Rutine.belongsToMany(models.User,
            {
              as: 'users',
              through: "user_rutine",
              foreignKey: "rutine_id",
              otherKey: "user_id"
            }
          );
    }
    return Rutine;
}