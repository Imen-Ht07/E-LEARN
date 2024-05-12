const express = require('express');
const router = express.Router();
const enseignantController = require('../controllers/EnseignantControlleur');

// Route pour l'inscription d'un nouvel enseignant
router.post('/registerEns', enseignantController.registerenseignant);

// Route pour obtenir tous les enseignants
router.get('/enseignants', enseignantController.findAll);

// Route pour mettre à jour un enseignant
router.put('modifEns/:id', enseignantController.update);

// Route pour supprimer un enseignant
router.delete('deleteEns/:id', enseignantController.delete);

// Route pour obtenir un enseignant par ID
router.get('EnsByID/:id', enseignantController.get);

// Route pour obtenir le nombre d'enseignants
router.get('/count', enseignantController.getNbrenseignant);

// Route pour refuser une demande d'inscription d'enseignant
router.delete('/refuseEns/:id', enseignantController.refuser);

// Route pour accepter une demande d'inscription d'enseignant
router.put('/acceptEns/:id', enseignantController.accept);

module.exports = router;
