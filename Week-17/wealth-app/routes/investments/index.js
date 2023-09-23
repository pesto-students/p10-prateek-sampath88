const router = require('express').Router();
const { isLoggedIn } = require('../../middlewares/isLoggedIn');
const { getUserInvestments, addUserInvestment, updateUserInvestment, deleteUserInvestment } = require('./controller');


//define your routes here

router.route('/').get(isLoggedIn, getUserInvestments);
router.route('/').post(isLoggedIn, addUserInvestment);
router.route('/').put(isLoggedIn, updateUserInvestment);
router.route('/').delete(isLoggedIn, deleteUserInvestment);

module.exports = router;
