const LiveCourse = require('../models/coursDirect');
const notificationController = require('./notificationController');
// Créer un cours en direct
exports.createLiveCourse = async (req, res) => {
  try {
      const { title, description, LienMeet, startTime, duration, invitedStudents } = req.body;
      
      // Créer un nouveau cours en direct
      const liveCourse = new LiveCourse({
          title,
          description,
          LienMeet,
          startTime,
          duration,
          invitedStudents
      });

      await liveCourse.save();

      // Message de notification
      const message = `Un nouveau cours en direct a été ajouté: ${liveCourse.title}.
      Participez via le lien: ${liveCourse.LienMeet}.
      Le ${liveCourse.startTime}`;

      // Envoyer une notification aux étudiants invités
      await notificationController.sendNotificationToStudents(message, liveCourse._id, invitedStudents);

      // Renvoyer une réponse avec le cours en direct créé
      res.status(201).json(liveCourse);
  } catch (error) {
      console.error('Erreur lors de la création du cours en direct :', error);
      res.status(500).json({ message: "Une erreur est survenue lors de la création du cours en direct." });
  }
};

// Obtenir tous les cours en direct
exports.getAllLiveCourses = async (req, res) => {
  try {
    const liveCourses = await LiveCourse.find();
    res.status(200).json(liveCourses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur est survenue lors de la récupération des cours en direct." });
  }
};

// Obtenir un cours en direct par ID
exports.getLiveCourseById = async (req, res) => {
  try {
    const liveCourse = await LiveCourse.findById(req.params.id);
    if (!liveCourse) {
      return res.status(404).json({ message: "Cours en direct non trouvé." });
    }
    res.status(200).json(liveCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur est survenue lors de la récupération du cours en direct." });
  }
};

// Mettre à jour un cours en direct
exports.updateLiveCourse = async (req, res) => {
  try {
    const updatedLiveCourse = await LiveCourse.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedLiveCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur est survenue lors de la mise à jour du cours en direct." });
  }
};

// Supprimer un cours en direct
exports.deleteLiveCourse = async (req, res) => {
  try {
    await LiveCourse.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Cours en direct supprimé avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur est survenue lors de la suppression du cours en direct." });
  }
};
