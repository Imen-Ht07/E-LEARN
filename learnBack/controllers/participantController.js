const CourseParticipation = require('../models/participantCours');

// Ajouter une participation à un cours
exports.addParticipation = async (req, res) => {
  try {
    const participation = new CourseParticipation({
      courseID: req.body.courseID,
      userID: req.body.userID
    });
    await participation.save();
    res.status(201).json(participation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir toutes les participations
exports.getAllParticipations = async (req, res) => {
  try {
    const participations = await CourseParticipation.find().populate('courseID').populate('userID');
    res.status(200).json(participations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir une participation par ID
exports.getParticipationById = async (req, res) => {
  try {
    const participation = await CourseParticipation.findById(req.params.id).populate('courseID').populate('userID');
    if (!participation) {
      return res.status(404).json({ message: 'Participation not found' });
    }
    res.status(200).json(participation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour une participation (par exemple, enregistrer l'heure de départ)
exports.updateParticipation = async (req, res) => {
  try {
    const updatedParticipation = await CourseParticipation.findByIdAndUpdate(
      req.params.id,
      { leftAt: req.body.leftAt },
      { new: true }
    );
    if (!updatedParticipation) {
      return res.status(404).json({ message: 'Participation not found' });
    }
    res.status(200).json(updatedParticipation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer une participation
exports.deleteParticipation = async (req, res) => {
  try {
    const participation = await CourseParticipation.findByIdAndDelete(req.params.id);
    if (!participation) {
      return res.status(404).json({ message: 'Participation not found' });
    }
    res.status(204).json({ message: 'Participation deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
