require('dotenv').config()

const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  adminLoginSchema,
  adminRegisterSchema
} = require("./validation/validationSchema");


exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.loginAdmin = async (req, res) => {

  const { error } = adminLoginSchema.validate(req.body)
  if (error) return res.status(500).send(error.details[0].message);

  const admin = await Admin.findOne({ phone: req.body.phone });
  if (!admin) return res.status(400).send("Phone is Found");

  const validPass = await bcrypt.compare(req.body.password, admin.password);
  if (!validPass) return res.status(400).send("Phone or password is incorrect");

  const token = jwt.sign({ _id: admin._id }, process.env.ADMIN_TOKEN_SECRET);
  res.header("auth-token", token).send(token);
};

exports.addAdmin = async (req, res) => {
  //VALIDATE DATA BEFORE SAVE ADMIN
  const { error } = adminRegisterSchema.validate(req.body)
  if (error) return res.status(500).send(error.details[0].message);

  //CHECK IF PARTICIPANT ALREADY EXIST
  const phoneExist = await Admin.findOne({ phone: req.body.phone });
  if (phoneExist) return res.status(400).send("Phone already exists");

  //HASH PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const admin = new Admin({
    full_name: req.body.full_name,
    phone: req.body.phone,
    password: hashPassword,
  });
  try {
    const newAdmin = await admin.save();
    res.status(200).json(newAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getOneAdmin = async (req, res) => {
  try {
    admin = await Admin.findById(req.params.id);
    admin === null ? res.status(404).json(admin) : res.status(200).send(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

