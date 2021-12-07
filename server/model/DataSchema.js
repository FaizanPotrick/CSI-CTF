const mongoose = require("mongoose");

const userData = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  solution: [{
    answer: {
      type: String,
      required: true,
    },
    time: {
      type: String,
    },
  }],
});
const Data = mongoose.model("DATA", userData);
module.exports = Data;
