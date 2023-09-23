const jwt = require("jsonwebtoken");
const BigPromise = require("./BigPromise");
const { Users } = require("../routes/users/module");

exports.isLoggedIn = BigPromise(async (req, res, next) => {
  const token =
    req.cookies.token ||
    req.body.token ||
    req.header("Authorization")?.replace("Bearer ", "");

  // if token does not exist
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "unauthorized",
      description: "Access to this API endpoint requires authentication.",
    });
  }
  try {
    // decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //get the user from DB
    req.user = await Users.findOne({
      where: { id: decoded.id },
    });

    //if user does not exist
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "unauthorized",
      });
    }
  } catch (error) {
    //if anything goes wrong
    return res.status(401).json({
      success: false,
      message: "unauthorized",
    });
  }
  //if all goes well, continue to next process
  return next();
});
