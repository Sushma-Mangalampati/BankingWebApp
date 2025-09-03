const express = require('express');
const {loginController, 
  registerController,
   getUserDataController, 
   getAccountDataController,
  transferController,
  getTransactionsController,
  getActiveUsersController,
  getUpdateUserBalanceController,
  updatePasswordController,
  getAllUsersController } = require('../controller/controller');

const router = express.Router();

router.post('/Login', loginController);
router.post('/Register', registerController);
router.get('/getUserData', getUserDataController);
router.get('/getAccountData', getAccountDataController);
router.post('/transfer', transferController);
router.get('/getTransactions', getTransactionsController);
router.get('/getAllUsers', getAllUsersController);
router.patch('/updateUserActiveStatus',getActiveUsersController);
router.patch('/updateUserBalance/:userId', getUpdateUserBalanceController);
router.post('/app/EditUser', updatePasswordController);


module.exports = router;