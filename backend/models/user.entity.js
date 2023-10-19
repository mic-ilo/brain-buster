//import mongoose
const mongoose = require("mongoose");

//creating the schema
const schema = new mongoose.Schema({
  _id: String,
  username: String,
  password: String,
  isActive: Boolean,
  highScore: Array,
});

const UserModel = mongoose.model("user", schema);

module.exports = UserModel;
