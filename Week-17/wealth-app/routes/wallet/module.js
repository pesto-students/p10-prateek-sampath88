const sequelize = require("../../database/sequelize");
const { DataTypes, UUIDV4 } = require("sequelize");
const { Users } = require("../users/module");


const Wallet = sequelize.define(
    "Wallet",
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
        type: {
            type: DataTypes.ENUM('credit', 'debit'),
            allowNull: false,
        },
        amount: {
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



Users.hasMany(Wallet, { foreignKey: 'userID' });
Wallet.belongsTo(Users, { foreignKey: 'userID' });


module.exports = {
    Wallet,
    sequelize,
};


