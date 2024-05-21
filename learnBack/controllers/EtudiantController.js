const etudiant = require('../models/etudiant');
const bcrypt = require("bcryptjs");

// Inscription d'un nouvel étudiant
exports.registerEtudiant = async (req, res) => {
    try {
        const { Nom, Prenom, email, password, cin, dateNaissance, Classe, tel, adresse } = req.body;
    
        // Vérifier si l'e-mail est déjà utilisé
        const existingEtudiant = await etudiant.findOne({ email });
        if (existingEtudiant) {
            return res.status(400).json({ message: "Cet e-mail est déjà enregistré." });
        }
    
        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Créer un nouvel étudiant avec les données reçues
        const newEtudiant = new etudiant({
            Nom,
            Prenom,
            email,
            role: 'etudiant', // Vous pouvez définir le rôle directement ici s'il est fixe pour les étudiants
            password: hashedPassword,
            cin,
            dateNaissance,
            Classe,
            tel,
            adresse
        });
    
        // Enregistrer l'étudiant dans la base de données
        await newEtudiant.save();
    
        res.status(201).json({ message: "Inscription réussie. En attente de vérification." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur est survenue lors de l'inscription." });
    }
};

// Obtenir tous les étudiants
exports.findAll = (req, res) => {
    etudiant.find({}).exec()
        .then(etudiants => {
            res.json(etudiants);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des étudiants." });
        });
};

// Mettre à jour un étudiant
exports.update = (req, res) => {
    etudiant.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
        .then(() => {
            res.status(200).send("Modification avec succès");
        })
        .catch(error => {
            console.log(error);
            res.status(500).send("Erreur lors de la modification de l'étudiant.");
        });
};

// Supprimer un étudiant
exports.delete = (req, res) => {
    etudiant.findOneAndDelete({ _id: req.params.id })
        .then(() => {
            res.status(200).json("Supprimé avec succès");
        })
        .catch(error => {
            console.log(error);
            res.status(500).send("Erreur lors de la suppression de l'étudiant.");
        });
};

// Obtenir un étudiant par ID
exports.get = (req, res) => {
    etudiant.findById(req.params.id)
        .then(etudiant => {
            if (!etudiant) {
                return res.status(404).send("Étudiant non trouvé.");
            }
            res.status(200).send(etudiant);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send("Erreur lors de la récupération de l'étudiant.");
        });
};

// Obtenir le nombre d'étudiants
exports.getNbretudiant = (req, res) => {
    etudiant.count({}).exec(function(err, st) {
        if (st === 0 && err) {
            res.json("Pas d'étudiants", err);
        } else {
            res.json(st); 
        }
    });
};

// Refuser une demande d'inscription étudiant
exports.refuser = (req, res) => {
    etudiant.findById({ _id: req.params.id }, function (err, etudiant) {
        console.log(etudiant.isVerified);
        if (etudiant.isVerified === false) {
            etudiant
                .remove()
                .then(() => {
                    res.status(200).send("Bravo, étudiant refusé");
                    console.log("Étudiant refusé");
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            console.log("Erreur: impossible de refuser un étudiant déjà vérifié.");
            res.status(400).send("Erreur: impossible de refuser un étudiant déjà vérifié.");
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send("Une erreur est survenue lors du refus de la demande.");
    });
};

// Accepter une demande d'inscription étudiant
exports.accept = (req, res) => {
    etudiant.findById({ _id: req.params.id }, function (err, etudiant) {
        console.log(etudiant.isVerified);
        if (etudiant.isVerified === true) {
            etudiant.save()
                .then(() => {
                    res.status(200).send("Bravo, étudiant accepté");
                    console.log("Étudiant accepté");
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            console.log("Erreur: impossible d'accepter un étudiant non vérifié.");
            res.status(400).send("Erreur: impossible d'accepter un étudiant non vérifié.");
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send("Une erreur est survenue lors de l'acceptation de la demande.");
    });
    };

