const mongoose = require("mongoose");
const moment = require("moment");
const userData = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  solution: [{
    answer: {
      type: String
    },
    time: {
      type: String
    },
  }],
});
const Data = mongoose.model("DATA", userData);
module.exports = Data;
