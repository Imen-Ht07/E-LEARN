const mongoose = require('mongoose');

const liveCourseSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  startTime: { type: Date, required: true },
  duration: { type: Number, required: true }
});

const LiveCourse = mongoose.model('LiveCourse', liveCourseSchema);

module.exports = LiveCourse;
