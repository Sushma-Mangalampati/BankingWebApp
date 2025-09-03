const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  accountNumber: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
 
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
});

const accountModel = mongoose.model('BankAccount', accountSchema);

const findAccountByOwnerId = async (owner) => {
  console.log("Finding account for owner ID:", owner);
  try {
    return await accountModel.findOne({ owner });
  } catch (error) {
    console.log('Error in findByownerId:', error.message);
  }
};


const findByAccountNumber = async (accountNumber) => {
  try {
    return await accountModel.findOne({ accountNumber });
  } catch (error) {
    console.log('Error in findByAccountNumber:', error.message);
  }
};

const findById = async (_id) => {
  try {
    return await accountModel.findOne({ _id });
  } catch (error) {
    console.log('Error in findById:', error.message);
  }
};




module.exports = {accountModel, findAccountByOwnerId,findByAccountNumber, findById};