const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
router.post("/save", adminController.saveadmin);
router.put("/update/:id", adminController.update);
router.delete("/delete/:id", adminController.delete);
router.get("/get/:id", adminController.get);
module.exports = router;