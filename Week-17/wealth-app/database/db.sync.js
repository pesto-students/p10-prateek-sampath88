const sequelize = require("./sequelize");
const { Investments } = require("../routes/investments/module");
const { Users } = require("../routes/users/module");
const { Wallet } = require("../routes/wallet/module");


exports.syncDB = async () => {
  try {
    await Users.sync({alter: true});
    await Investments.sync({alter: true});
    await Wallet.sync({alter: true});
  } catch (err) {
    throw new Error("Database Sync Failed");
  }

};
