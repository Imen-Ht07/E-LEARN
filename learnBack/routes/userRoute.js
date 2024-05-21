const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
// Routes pour les utilisateurs
router.post('/signin', UserController.signin);
router.get("/profile", UserController.getCurrentUserProfile);
router.post('/signout', UserController.signout);
module.exports = router;
