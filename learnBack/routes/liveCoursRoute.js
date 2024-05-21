const express = require('express');
const router = express.Router();
const liveCourseController = require('../controllers/LiveCourseController');

router.post('/createLive', liveCourseController.createLiveCourse);
router.get('/liveList', liveCourseController.getAllLiveCourses);
router.get('/getLiveByid/:id', liveCourseController.getLiveCourseById);
router.put('/updateLive/:id', liveCourseController.updateLiveCourse);
router.delete('/deleteLive/:id', liveCourseController.deleteLiveCourse);

module.exports = router;
