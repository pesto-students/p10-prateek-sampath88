const router = require('express').Router();

const { deleteUserWallet, updateUserWallet, addUserWallet, uploadInvoice, getUserWalletSummary, getUserWalletDetails } = require('./controller');
const { isLoggedIn } = require('../../middlewares/isLoggedIn');



//define your routes here
router.route('/summary').get(isLoggedIn, getUserWalletSummary)
router.route('/').get(isLoggedIn, getUserWalletDetails);
router.route('/').post(isLoggedIn, addUserWallet);
router.route('/').put(isLoggedIn, updateUserWallet);
router.route('/').delete(isLoggedIn, deleteUserWallet);
router.route('/upload').post(isLoggedIn, uploadInvoice)



module.exports = router;
