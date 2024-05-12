const etudiant = require('../models/etudiant');
const bcrypt = require("bcryptjs");

// Inscription d'un nouvel étudiant
exports.registerEtudiant = async (req, res) => {
    try {
      const { Nom,Prenom, email, password, cin, dateNaissance, Classe, tel, adresse } = req.body;
  
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
  

//get all
    exports.findAll = (req, res) => {
        etudiant.find({}).exec(function (err, etudiant) {
            if (err) {
                console.error("erreur");
            } else {
                res.json(etudiant);
            }
        });
    }
//update
    exports.update = (req,res) => {
        etudiant.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
              .then((etudiant) => {
                  res.status(200).send("modification avec succes")
              })
              .catch((error) => { console.log(error) });
      };
//delete
      exports.delete = (req, res) => {
        etudiant.findOneAndDelete({ _id: req.params.id })
              .then((data) => {
                  res.status(200).json("Deleted...")
              })
              .catch((error) => { console.log(error) });
      };
//get by Id
      exports.get = (req, res) => {
        //let etudiantId = req.params.etudiantId;
        etudiant.findById({ _id: req.params.id })
            .then((etudiant) => {
                res.status(200).send(etudiant)
            })
            .catch((error) => { console.log(error) });
    };
//fonction count
  exports.getNbretudiant = (req,res) => {
    etudiant.count({}).exec(function(err, st) {
        if (st == 0 && err) {
          res.json("Pas de etudiants", err);
        } else {
          res.json(st); 
        }
      });
    }

//refuser demande d'inscription etudiant
exports.refuser=(req, res) =>{
  etudiant.findById({ _id: req.params.id }, function (err, etudiant) {
    console.log(etudiant.isVerified);
    if (etudiant.isVerified == false) {
      etudiant
        .remove()
        .then((res) => {
           res.status(200).send("bravo")
          console.log("etudiant refusé");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
     
      console.log("erreur");
    }
  })
    .then(res => res.status(200).send("bravo"))
    .catch((err) => {
      console.log(err);
    });
};
//accepter demande d'inscription etudiant
exports.accept=(req, res) =>{
  etudiant.findById({ _id: req.params.id }, function (err, etudiant) {
    console.log(etudiant.isVerified);
    if (etudiant.isVerified == true) {
      etudiant.save()
        .then((res) => {
           res.status(200).send("bravo");
          console.log("etudiant accepté");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
     
      console.log("erreur");
    }
  })
    .then(res => res.status(200).send("bravo"))
    .catch((err) => {
      console.log(err);
    });
};

    