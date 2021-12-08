const express = require("express");
const Answer = require("../model/AnswerSchema");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = express.Router();

router.post("/answer", async (req, res) => {
    const { answer } = req.body;
    const salt = await bcrypt.genSalt(saltRounds);
    const answerHash = await bcrypt.hash(answer,salt);
  //   bcrypt.genSalt(saltRounds,(err, salt) =>{
  //     bcrypt.hash(answerHash, salt, (err, hash)=> {
  //         return  hash;
  //     });
  // });
  console.log(answerHash)
    if (!answerHash) {
      return res.status(422).json({ error: "the data is not filled" });
    }
    try {
      const validAnswer = await bcrypt.compare(answer, answerHash);
      console.log(validAnswer)
      const check = await Answer.findOne({ answer: answerHash });
      if (check) {
        return res
          .status(422)
          .json({ error: "This data has already been taken" });
      }
      const response = await new Answer({ answer : answerHash });
      console.log(response)
      
      await response.save();
      res.json(response);
    } catch (error) {
      res.send(error);
    }
  });
module.exports = router;