const sequelize = require("../../database/sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { DataTypes, UUIDV4 } = require("sequelize");

const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please provide a name",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Please provide an email",
        },
        isEmail: {
          msg: "Please provide a valid email address",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please provide a password",
        },
        len: {
          args: [6],
          msg: "password should be atleast 6 characters",
        },
      },
    },
    forgotPasswordToken: DataTypes.STRING,
    forgotPasswordExpiry: DataTypes.DATE,
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["password"],
      },
    },
    scopes: {
      withPassword: {
        attributes: {
          include: ["password"],
        },
      },
      withOutPassword: {
        attributes: {
          exclude: ["password"],
        },
      },
      onlyUser: {
        attributes: {
          exclude: ["forgotPasswordToken", "forgotPasswordExpiry"],
        },
      },
    },
  }
);

//encrypt password before save - HOOKS
Users.beforeSave(async function (user, options) {
  // if password is not modified return;
  if (!user.changed("password")) return;

  // if password is modified encrypt it
  user.password = await bcrypt.hash(user.password, 10);
});

// validate the userSentPassword with db password
Users.prototype.isValidPassword = async function (userSentPassword) {
  return await bcrypt.compare(userSentPassword, this.password);
};

//create and return jwt token
Users.prototype.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

module.exports = {
  Users,
  sequelize,
};
