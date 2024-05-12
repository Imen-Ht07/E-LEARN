const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Ens = require('../models/enseignant');
const Etud = require('../models/etudiant');
const Admin = require('../models/admin');
const config = require('../_helpers/auth.config');
// Connexion d'un utilisateur existant
exports.signin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
      const ens = await Ens.findOne({ email: req.body.email });
      if (ens) {
        req.userRole = "enseignant";
        bcrypt.compare(req.body.password, ens.password, function (err, isMatch) {
          if (isMatch && !err) {
            if (ens.isVerified) { // Vérifier si l'enseignant est vérifié
              const expirationTime = 86400; 
              var token = jwt.sign({ _id: ens._id, role: ens.role }, config.secret, {
                expiresIn: expirationTime,
              });
              console.log("token:", token);
              res.cookie("token", token, { maxAge: expirationTime * 1000 });
              res.json({
                success: true,
                token: token,
                role: "enseignant",
                user: ens,
              });
            } else {
              res.send({
                success: false,
                msg: "Authentication failed. Your account is not verified.",
              });
            }
          } else {
            res.send({
              success: false,
              msg: "Authentication failed. Wrong password.",
            });
          }
        });
      } else {
        const etudiant = await Etud.findOne({ email: req.body.email });
        if (!etudiant) {
          res.send({
            success: false,
            msg: "Authentication failed. User not found.",
          });
        } else {
          req.userRole = "etudiant";
          bcrypt.compare(req.body.password, etudiant.password, function (err, isMatch) {
            if (isMatch && !err) {
              if (etudiant.isVerified) { // Vérifier si l'étudiant est vérifié
                var token = jwt.sign({ _id: etudiant._id, role: etudiant.role }, config.secret, {
                  expiresIn: 86400, // 24 hours
                });
                console.log("token:", token)
                res.cookie("token", token);
                res.json({
                  success: true,
                  token: token,
                  role: "etudiant",
                  user: etudiant,
                });
              } else {
                res.send({
                  success: false,
                  msg: "Authentication failed. Your account is not verified.",
                });
              }
            } else {
              res.send({
                success: false,
                msg: "Authentication failed. Wrong password.",
              });
            }
          });
        }
      }
    } else {
      req.userRole = "admin";
      bcrypt.compare(req.body.password, admin.password, function (err, isMatch) {
        if (isMatch && !err) {
          var token = jwt.sign({ _id: admin._id, role: admin.role }, config.secret, {
            expiresIn: 86400, // 24 hours
          });
          console.log("token:", token)
          res.cookie("token", token);
          res.json({
            success: true,
            token: token,
            role: "admin",
            user: admin,
          });
        } else {
          res.send({
            success: false,
            msg: "Authentication failed. Wrong password.",
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      msg: "Something went wrong. Please try again later.",
    });
  }
};

exports.getCurrentUserProfile = async (req, res) => {
  try {
    if (!req._id || !req.userRole) {
      return res.status(401).send({ message: "Unauthorized!" });
    }

    let user;
    switch (req.userRole) {
      case "etudiant":
        user = await Etud.findById(req._id);
        break;
      case "enseignant":
        user = await Ens.findById(req._id);
        break;
      case "admin":
        user = await Admin.findById(req._id);
        break;
      default:
        return res.status(400).send({ message: "Invalid user role." });
    }

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Fonction de déconnexion
exports.signout = (req, res) => {
  try {
    // Supprimer le cookie contenant le token
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Signed out successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
  }
};
