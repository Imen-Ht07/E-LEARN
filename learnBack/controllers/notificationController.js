const Notification = require('../models/notification');

// Fonction pour envoyer des notifications aux étudiants invités
exports.sendNotificationToStudents = async (message) => {
  try {
    const notification = new Notification({
      message,
    });

    await notification.save();

    // Logique pour envoyer la notification aux étudiants invités (par exemple, email, push notification, etc.)
    console.log('Notification envoyée avec succès aux étudiants invités.');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la notification :', error);
  }
};

// Fonction pour obtenir toutes les notifications
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Erreur lors de la récupération des notifications :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des notifications.' });
  }
};

// Fonction pour supprimer une notification par ID
exports.deleteNotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndDelete(id);
    res.status(200).json({ message: 'Notification supprimée avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la notification :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de la notification.' });
  }
};
