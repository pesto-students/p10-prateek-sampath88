const sequelize = require("../../database/sequelize");
const { DataTypes, UUIDV4 } = require("sequelize");
const { Users } = require("../users/module");



const Investments = sequelize.define(
    "Investments",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
        },
        userID: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Invalid or Missing UserID",
                },
            },
        },
        investmentType: {
            type: DataTypes.ENUM('ASSET', 'FD', 'BONDS', 'STOCKS'),
            allowNull: false,
        },
        investAmount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        returnAmount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.CURRENT_TIMESTAMP,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.CURRENT_TIMESTAMP,
        }
    }
);



Users.hasMany(Investments, { foreignKey: 'userID' });
Investments.belongsTo(Users, { foreignKey: 'userID' });


module.exports = {
    Investments,
    sequelize,
};


