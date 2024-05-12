const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const EnseignantSchema = new mongoose.Schema({
  Nom: { type: String, required: true},
  Prenom: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['enseignant'],},
  cin : {type: Number, required: true, unique: true},
  dateNaissance : {type :String},
  specialite: {type: String},
  tel: {type: Number},
  adresse: {type: String },
  isVerified: {type:Boolean, default: false},
});

const Enseignant = mongoose.model('Enseignant', EnseignantSchema);

module.exports = Enseignant;


  


