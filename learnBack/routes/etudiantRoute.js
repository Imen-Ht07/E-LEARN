const express = require('express');
const router = express.Router();
const etudiantController = require('../controllers/EtudiantController');

// Route pour l'inscription d'un nouvel etudiant
router.post('/registerEtud', etudiantController.registerEtudiant);

// Route pour obtenir tous les etudiants
router.get('/etudiants', etudiantController.findAll);

// Route pour mettre à jour un etudiant
router.put('modifEtud/:id', etudiantController.update);

// Route pour supprimer un etudiant
router.delete('deleteEtud/:id', etudiantController.delete);

// Route pour obtenir un etudiant par ID
router.get('EtudByID/:id', etudiantController.get);

// Route pour obtenir le nombre d'etudiants
router.get('/count', etudiantController.getNbretudiant);

// Route pour refuser une demande d'inscription d'etudiant
router.delete('/refuseEtud/:id', etudiantController.refuser);

// Route pour accepter une demande d'inscription d'etudiant
router.put('/acceptEtud/:id', etudiantController.accept);

module.exports = router;
