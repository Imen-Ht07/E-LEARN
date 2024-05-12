const mongoose = require('mongoose');

const categorieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageCat: { type: String },
});

const categorie = mongoose.model('categorie', categorieSchema);

module.exports = categorie;