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
        enseignant.find({}).exec(function (err, enseignant) {
            if (err) {
                console.error("erreur");
            } else {
                res.json(enseignant);
            }
        });
    }
//update
    exports.update = (req,res) => {
        enseignant.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
              .then((enseignant) => {
                  res.status(200).send("modification avec succes")
              })
              .catch((error) => { console.log(error) });
      };
//delete
      exports.delete = (req, res) => {
        enseignant.findOneAndDelete({ _id: req.params.id })
              .then((data) => {
                  res.status(200).json("Deleted...")
              })
              .catch((error) => { console.log(error) });
      };
//get by Id
      exports.get = (req, res) => {
        //let enseignantId = req.params.enseignantId;
        enseignant.findById({ _id: req.params.id })
            .then((enseignant) => {
                res.status(200).send(enseignant)
            })
            .catch((error) => { console.log(error) });
    };
//fonction count
  exports.getNbrenseignant = (req,res) => {
    enseignant.count({}).exec(function(err, st) {
        if (st == 0 && err) {
          res.json("Pas de enseignants", err);
        } else {
          res.json(st); 
        }
      });
    }

//refuser demande d'inscription enseignant
exports.refuser=(req, res) =>{
  enseignant.findById({ _id: req.params.id }, function (err, enseignant) {
    console.log(enseignant.isVerified);
    if (enseignant.isVerified == false) {
      enseignant
        .remove()
        .then((res) => {
           res.status(200).send("bravo")
          console.log("enseignant refusé");
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
//accepter demande d'inscription enseignant
exports.accept=(req, res) =>{
  enseignant.findById({ _id: req.params.id }, function (err, enseignant) {
    console.log(enseignant.isVerified);
    if (enseignant.isVerified == true) {
      enseignant.save()
        .then((res) => {
           res.status(200).send("bravo");
          console.log("enseignant accepté");
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
