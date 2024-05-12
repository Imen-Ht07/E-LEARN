const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  categorieID: { type: mongoose.Schema.Types.ObjectId, ref: 'categorie' },
  title: { type: String, required: true },
  description: { type: String },
  fileURL: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
