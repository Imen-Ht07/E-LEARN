// Importations
const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const fs = require('fs');

// Routes
const user = require("./routes/userRoute");
const ressource = require("./routes/ressourceRoute");
const admin = require("./routes/adminRoute");
const catego = require("./routes/categoRoute");
const enseignant = require("./routes/enseignantRoute");
const etudiant = require("./routes/etudiantRoute");
const liveCours = require("./routes/liveCoursRoute");
const notification = require("./routes/notificationRoute")
// CORS configuration
app.use(cors({
  origin: 'http://localhost:4200', // Update to the origin of your frontend
  credentials: true
}));

// Other middlewares and routes...
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
// Définir le dossier 'uploads' comme dossier statique
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const paths = ['uploads/images', 'uploads/videos', 'uploads/pdfs'];

paths.forEach(path => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
    }
});



// Utilisation des routes
app.use('/user', user);
app.use('/live', liveCours);
app.use('/cours', ressource);
app.use('/admin', admin);
app.use('/catego', catego);
app.use('/enseignant', enseignant);
app.use('/etudiant', etudiant);
app.use('/notification', notification);

// Connexion à la base de données
require('./database');

// Port d'écoute du serveur
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
