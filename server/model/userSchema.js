const mongoose = require("mongoose");

const userFormat = new mongoose.Schema({
  group: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});
const User = mongoose.model("GROUP", userFormat);
module.exports = User;
