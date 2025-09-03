const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: {type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  active: { type: Boolean, default: false},
  accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }],
  
});

const userModel = mongoose.model('BankUser', userSchema);

const findByEmail = async (email) => {
  try {
    return await userModel.findOne({ email });
  } catch (error) {
    console.error('Error in findByEmail:', error.message);
  }
};

module.exports = {userModel, findByEmail};