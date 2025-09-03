const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  type: { type: String, enum: ['deposit', 'withdrawal', 'transfer'], required: true },
  sourceAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  destinationAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  timestamp: { type: Date, default: Date.now },
});

const transactionModel = mongoose.model('BankTransaction', transactionSchema);

const findAllTransactions = async (query) => {
  try {
    return await transactionModel.find(query);
  } catch (error) {
    console.error('Error in findAllTransactions:', error.message);
  }
};


module.exports = {transactionModel, findAllTransactions};