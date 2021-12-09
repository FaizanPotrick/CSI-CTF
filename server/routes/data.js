const express = require("express");
const Data = require("../model/DataSchema");
const moment = require("moment");
const router = express.Router();
router.post("/submit", async (req, res) => {
  const { id, answer } = req.body;
  try {
    const currentTime = moment().format("MMMM Do YYYY, h:mm:ss a");
    const findData = await Data.find({ answer: answer, id: id });
    const array = findData[0].solution.filter((e) => {
      return e.answer === answer;
    });
    if (array.length) {
      return res.json("success:your answer has already been stored" );
    }
    await Data.updateOne(
      { id: id },
      { $push: { solution: { answer: answer, time: currentTime } } }
    );
    res.json("success:correct");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
