const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const etudiantSchema = new mongoose.Schema({
  Nom: { type: String, required: true},
  Prenom: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['etudiant']},
  cin : {type:Number, required: true, unique: true},
  dateNaissance : {type :String },
  Classe : {type: String , enum: ['1er','2éme ','3éme']},
  tel: {type: Number },
  adresse: {type: String },
  isVerified: {type:Boolean, default: false}
});

const etudiant = mongoose.model('Etudiant', etudiantSchema);

module.exports = etudiant;