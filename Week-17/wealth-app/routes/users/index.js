const { isLoggedIn } = require("../../middlewares/isLoggedIn");
const { signup, login, logout, user } = require("./controller");

const router = require("express").Router();

//define your routes here
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);

//private routes, use isLoggedIn middleware
router.route("/user").get(isLoggedIn, user);

module.exports = router;
