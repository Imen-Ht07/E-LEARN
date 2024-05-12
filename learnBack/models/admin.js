const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
  nomPrenom: { type: String},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin']},
  isVerified: {type:Boolean, default: true}
      });
const admin = mongoose.model('admin', adminSchema);

module.exports = admin;