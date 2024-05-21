const mongoose = require('mongoose');

const liveCourseSchema = new mongoose.Schema({
  Invited: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Etudiant' }],
  title: { type: String },
  description: { type: String },
  LienMeet:{ type: String },
  startTime: { type: String },
  duration: { type: String }
});

const LiveCourse = mongoose.model('LiveCourse', liveCourseSchema);

module.exports = LiveCourse;
