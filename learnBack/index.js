//importation
const express = require('express');
const app = express();
require('dotenv').config();

//Routes 
const user = require("./routes/userRoute");
const participant = require("./routes/participantRoute");
const ressource = require("./routes/ressourceRoute");
const admin = require("./routes/adminRoute");
const catego = require("./routes/categoRoute");
const enseignant = require("./routes/enseignantRoute");
const etudiant = require("./routes/etudiantRoute");
//cors
const cors = require('cors');
app.use(cors());
//middleware
app.use(express.json());
//aide les ports de back et front a s'adapter 
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
   "Access-Control-Allow-Headers",
   "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
   res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
   return res.status(200).json({});
  }
  next();
 });
 //pour les images BFR(Backend et Frontend Relation)
app.use('/uploads', express.static('uploads'));
 //USE express
app.use(express.json());
//other use routes
app.use('/user', user);
app.use('/participant', participant);
app.use('/cours', ressource);
app.use('/admin',admin);
app.use('/catego',catego);
app.use('/enseignant',enseignant);
app.use('/etudiant',etudiant);
                   
//appel a database.js 
require('./database');

//port d'ecoute du serveur
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 