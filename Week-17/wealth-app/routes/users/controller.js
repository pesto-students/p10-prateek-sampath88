const BigPromise = require("../../middlewares/BigPromise");
const { Users } = require("./module");
const cookieToken = require("../../utils/cookieToken");
const { ValidationError } = require("sequelize");

exports.signup = BigPromise(async (req, res, next) => {
  //collect name, email and password
  const { name, email, password } = req.body;

  //check for presence of name, email and password
  if (!(name && email && password)) {
    return res.status(400).json({
      success: false,
      message: "Name, email and password are required",
    });
  }

  //check for duplicate email
  const isEmailExists = await Users.scope([
    "withOutPassword",
    "onlyUser",
  ]).findOne({
    where: { email },
  });

  if (isEmailExists) {
    return res.status(400).json({
      success: false,
      message: "user exists with provided email, please login",
    });
  }

  try {
    //save user to DB
    const user = await Users.create({
      name,
      email,
      password,
    });

    // to avoid sensitive data leak
    const newUser = await Users.scope(["withOutPassword", "onlyUser"]).findOne({
      where: { id: user.id },
    });

    //if all goes good,then we send token
    cookieToken(newUser, res);
  } catch (error) {
    //catch any validation errors
    if (error instanceof ValidationError) {
      console.error(error);
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    //if not validation error call next process
    next(error);
  }
});

exports.login = BigPromise(async (req, res, next) => {
  //collect email and password
  const { email, password } = req.body;

  //check for presence of email and password
  if (!(email && password)) {
    return res.status(400).json({
      success: false,
      message: "please provide email and password",
    });
  }

  //get user from DB
  const user = await Users.scope(["withPassword", "onlyUser"]).findOne({
    where: { email },
  });

  //if user not exist in DB
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Email or password does not match or exist",
    });
  }

  //validate or match the password
  const isValidPassword = await user.isValidPassword(password);

  //if password do not match
  if (!isValidPassword) {
    return res.status(400).json({
      success: false,
      message: "Email or password does not match or exist",
    });
  }

  //if all goes good, then we send token
  cookieToken(user, res);
});

exports.logout = BigPromise(async (req, res, next) => {
  //set cookie value to --> null
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logout success",
  });
});

exports.user = BigPromise(async (req, res, next) => {
  const userId = req.user.id;

  //get essential user details from DB
  const user = await Users.scope(["withOutPassword", "onlyUser"]).findOne({
    where: { id: userId },
  });

  //if user not exist in DB
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "user not found",
    });
  }

  res.status(200).json({
    success: true,
    user,
  });
});
