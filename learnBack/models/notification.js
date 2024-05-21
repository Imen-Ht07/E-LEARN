const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  //recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Etudiant' }],
 // liveID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LiveCourse' }],
  message: { type: String},
  createdAt: { type: Date, default: Date.now }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
