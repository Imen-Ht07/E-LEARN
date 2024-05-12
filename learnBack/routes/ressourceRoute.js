const express = require('express');
const router = express.Router();
const upload = require('../multer');
const resourceController = require('../controllers/ressourceController');

router.post('/:categorieID/resources', upload.single('fileURL'),resourceController.createResource);
router.get('/getresources/:categorieID', resourceController.getAllResources);
router.get('/resources/:id', resourceController.getResourceById);
router.put('/resources/:id', upload.single('fileURL'), resourceController.updateResource);
router.delete('/resources/:id', resourceController.deleteResource);

module.exports = router;
