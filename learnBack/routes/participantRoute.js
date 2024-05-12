const express = require('express');
const router = express.Router();
const courseParticipationController = require('../controllers/participantController');

router.post('/', courseParticipationController.addParticipation);
router.get('/', courseParticipationController.getAllParticipations);
router.get('/:id', courseParticipationController.getParticipationById);
router.put('/:id', courseParticipationController.updateParticipation);
router.delete('/:id', courseParticipationController.deleteParticipation);

module.exports = router;
