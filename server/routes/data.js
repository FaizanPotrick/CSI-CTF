const express = require("express");
const Data = require("../model/DataSchema");
const Answer = require("../model/AnswerSchema");
const moment = require("moment");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = express.Router();
// router.post("/data", async (req, res) => {
//   const { id, solution } = req.body;
//   if (!id) {
//     return res.status(422).json({ error: "the data is not filled" });
//   }
//   try {
//     const check = await Data.findOne({ id: id });
//     if (check) {
//       return res
//         .status(422)
//         .json({ error: "This data has already been taken" });
//     }
//     const response = await new Data({
//       id,
//       solution,
//     });
//     await response.save();
//     res.json(response);
//   } catch (error) {
//     res.send(error);
//   }
// });
router.post("/submit", async (req, res) => {
  const { id, answer } = req.body;
  const answerHash = answer;
  bcrypt.hash(answerHash, saltRounds, (err, hash) =>{
    return console.log(hash)
});
  try {
    const find = await Answer.find({ answer: answer });
    if (!find.length) {
      return res.json("danger:Incorrect");
    }
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
