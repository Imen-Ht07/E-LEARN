const express = require('express');
const router = express.Router();
const upload = require('../multer');
const categoryController = require('../controllers/categoController');

// Créer une nouvelle catégorie
router.post('/categorie', upload.single('imageCat'), categoryController.createCategory);

// Obtenir toutes les catégories
router.get('/listcategories', categoryController.getAllCategories);

// Obtenir une catégorie par son ID
router.get('/categories/:id', categoryController.getCategoryById);

// Mettre à jour une catégorie
router.put('/categories/:id', categoryController.updateCategory);

// Supprimer une catégorie
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;
