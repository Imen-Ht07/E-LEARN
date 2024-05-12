const Resource = require('../models/ressources');


exports.createResource = async (req, res) => {
  try {
    const { title, description} = req.body;
    const categorieID = req.params.categorieID; // Categorie
    const fileURL = req.file.path; 
    const newResource = new Resource({ title, description, fileURL, categorieID }); 
    await newResource.save();
    res.status(201).json({ message: "Ressource créée avec succès", data: newResource });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de la ressource", error: error.message });
  }
};
exports.getAllResources = async (req, res, next) => {
  try {
    const resources = await Resource.find({ categorieID: req.params.categorieID }).exec();
    res.json(resources);
  } catch (error) {
    next(error);
  }
};

exports.getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Ressource non trouvée" });
    }
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la ressource", error: error.message });
  }
};

exports.updateResource = (req, res, next) => {
  const updatedData = {
    ...req.body
  };
  if (req.file) {
    updatedData.fileURL = path.join('/uploads/pdfs', req.file.filename);
  }

  Resource.findByIdAndUpdate(
    req.params.id,
    {
      $set: updatedData,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json({ message: "Ressource mise à jour avec succès", data: data });
      }
    }
  );
};
exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Ressource non trouvée" });
    }
    res.status(204).json({ message: "Ressource supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de la ressource", error: error.message });
  }
};
