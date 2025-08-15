const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('Auth', authSchema);
