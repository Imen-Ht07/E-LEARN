const multer = require('multer');
const path = require('path');

// Définition du stockage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    if (file.mimetype.startsWith('image')) {
      cb(null, 'uploads/images/');
    } else if (file.mimetype.startsWith('video')) {
      cb(null, 'uploads/videos/');
    } else if (file.mimetype === 'application/pdf') {
      cb(null, 'uploads/pdfs/');
    } else {
      cb({ message: 'Ce type de fichier n\'est pas pris en charge' }, false);
    }
  },
  filename: function(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});

// Filtrer les types de fichiers
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video') || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Non pris en charge: seulement les images, vidéos et PDF sont acceptés'), false);
  }
};

const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 100 } // 100MB for videos and pdf
});

module.exports = upload;
