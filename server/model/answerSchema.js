const mongoose = require("mongoose");

const answerData = new mongoose.Schema({
  answer: [
    {
      type: String,
      required: true,
    },
  ],
});

const answerSchema = new mongoose.model("answerSchema", answerData);
module.exports = answerSchema;
