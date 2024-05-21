const enseignant = require('../models/enseignant');
const bcrypt = require("bcryptjs");

// l'inscription d'un nouvel enseignant
exports.registerenseignant = async (req, res) => {
    try {
        const { Nom,Prenom, email, password, cin, dateNaissance, specialite, tel, adresse } = req.body;
    
        // Vérifier si l'e-mail est déjà utilisé
        const existingenseignant = await enseignant.findOne({ email });
        if (existingenseignant) {
          return res.status(400).json({ message: "Cet e-mail est déjà enregistré." });
        }
    
        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Créer un nouvel enseignant avec les données reçues
        const newenseignant = new enseignant({
          Nom,
          Prenom,
          email,
          role: 'enseignant', // Vous pouvez définir le rôle directement ici s'il est fixe pour les enseignants
          password: hashedPassword,
          cin,
          dateNaissance,
          specialite,
          tel,
          adresse
        });
    
        // Enregistrer l'enseignant dans la base de données
        await newenseignant.save();
    
        res.status(201).json({ message: "Inscription réussie. En attente de vérification." });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur est survenue lors de l'inscription." });
      }
    };  

//get all
exports.findAll = (req, res) => {
  enseignant.find({}).exec()
      .then(enseignants => {
          res.json(enseignants);
      })
      .catch(err => {
          console.error(err);
          res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des enseignants." });
      });
}
// Update
exports.update = (req, res) => {
  enseignant.findByIdAndUpdate(req.params.id, req.body)
      .then(() => {
          res.status(200).send("Modification avec succès");
      })
      .catch(error => {
          console.log(error);
          res.status(500).send("Erreur lors de la modification de l'enseignant.");
      });
};

// Delete
exports.delete = (req, res) => {
  enseignant.findByIdAndDelete(req.params.id)
      .then(() => {
          res.status(200).json("Supprimé avec succès");
      })
      .catch(error => {
          console.log(error);
          res.status(500).send("Erreur lors de la suppression de l'enseignant.");
      });
};

// Get by Id
exports.get = (req, res) => {
  enseignant.findById(req.params.id)
      .then(enseignant => {
          if (!enseignant) {
              return res.status(404).send("Enseignant non trouvé.");
          }
          res.status(200).send(enseignant);
      })
      .catch(error => {
          console.log(error);
          res.status(500).send("Erreur lors de la récupération de l'enseignant.");
      });
};

// Fonction count
exports.getNbrenseignant = (req, res) => {
  enseignant.countDocuments({})
      .then(count => {
          if (count === 0) {
              res.status(404).json("Pas d'enseignants trouvés.");
          } else {
              res.status(200).json(count);
          }
      })
      .catch(error => {
          console.log(error);
          res.status(500).send("Erreur lors de la récupération du nombre d'enseignants.");
      });
};
// Accepter une demande
exports.accept = (req, res) => {
  const id = req.params.id;
  enseignant.findById(id)
      .then(enseignant => {
          if (!enseignant) {
              return res.status(404).json({ message: "Enseignant non trouvé avec l'ID fourni" });
          }
          enseignant.isVerified = true; // Mettre à jour le statut
          return enseignant.save(); // Sauvegarder les modifications
      })
      .then(updatedEnseignant => {
          res.json(updatedEnseignant); // Retourner l'enseignant mis à jour
      })
      .catch(err => {
          console.error(err);
          res.status(500).json({ message: "Une erreur s'est produite lors de l'acceptation de la demande." });
      });
};

// Refuser une demande
exports.refuse = (req, res) => {
  const id = req.params.id;
  enseignant.findById(id)
      .then(enseignant => {
          if (!enseignant) {
              return res.status(404).json({ message: "Enseignant non trouvé avec l'ID fourni" });
          }
          enseignant.isVerified = false; // Mettre à jour le statut
          return enseignant.save(); // Sauvegarder les modifications
      })
      .then(updatedEnseignant => {
          res.json(updatedEnseignant); // Retourner l'enseignant mis à jour
      })
      .catch(err => {
          console.error(err);
          res.status(500).json({ message: "Une erreur s'est produite lors du refus de la demande." });
      });
};

