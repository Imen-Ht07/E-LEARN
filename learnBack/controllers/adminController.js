const bcrypt = require("bcryptjs");
const admin = require("../models/admin")
exports.saveadmin = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newAdmin = new admin({ 
      nomPrenom: req.body.nomPrenom,
      email: req.body.email,
      role: req.body.role,
      password: hashedPassword
    });
    await newAdmin.save();
  res.status(200).json("admin succeffuly added");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//update
exports.update = (req,res) => {
    admin.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
          .then((admin) => {
              res.status(200).send("modification avec succes")
          })
          .catch((error) => { console.log(error) });
  };
//delete
  exports.delete = (req, res) => {
    admin.findOneAndDelete({ _id: req.params.id })
          .then((data) => {
              res.status(200).json("Deleted...")
          })
          .catch((error) => { console.log(error) });
  };
//get by Id
  exports.get = (req, res) => {
    //let adminId = req.params.adminId;
    admin.findById({ _id: req.params.id })
        .then((admin) => {
            res.status(200).send(admin)
        })
        .catch((error) => { console.log(error) });
};
