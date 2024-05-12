const mongoose = require('mongoose');

const courseParticipationSchema = new mongoose.Schema({
  courseID: { type: mongoose.Schema.Types.ObjectId, ref: 'LiveCourse', required: true },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  joinedAt: { type: Date, default: Date.now },
  leftAt: { type: Date }
});

const CourseParticipation = mongoose.model('CourseParticipation', courseParticipationSchema);

module.exports = CourseParticipation;
