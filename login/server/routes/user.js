const express = require("express");
const User = require("../model/UserSchema");
const Data = require("../model/DataSchema");
const router = express.Router();
const moment = require("moment");
const bcrypt = require('bcrypt');

router.post("/login", async (req, res) => {
  const { group, password } = req.body;
  try {
    const data = await User.find({ group: group });
    if (!data.length) {
      return res.json("danger:The groupname is incorrect please try again");
    }
    const encrypt = bcrypt.compareSync(password, data[0].password);
    if(!encrypt){
      return res.json("danger:The password is incorrect please try again");
    }
    const id = data[0]._id;
    const check = await Data.find({ id: id });
    if (check.length) {
      return res.json({data, alert:"success:login successful"});
    }
    const response = await new Data({ id: id, group:group });
    await response.save();
    res.json({data, alert:"success:login successful"});
    
  } catch (error) {
    return res.send(error);
  }
});
router.post("/submit", async (req, res) => {
  const { id, answer } = req.body;
  try {
    const currentTime = moment().format("h:mm:ss a");
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
