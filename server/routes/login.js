const express = require("express");
const User = require("../model/userSchema");
const Data = require("../model/DataSchema");
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post("/register", async (req, res) => {
  const {
    group,
    gmail,
    firstMember,
    secondMember,
    thirdMember,
    password,
  } = req.body;
  try {
  const passwordHash = bcrypt.hashSync(password, saltRounds);
    const check = await User.find({ group: group });
    if (check.length) {
      return res.json("danger:This username has already been taken, please enter new username");
    }
    const response = await new User({
      group,
      gmail,
      firstMember,
      secondMember,
      thirdMember,
      password : passwordHash,
    });
    
    await response.save();
    res.json("success:This data has been stored successfully");
  } catch (error) {
    res.send(error);
  }
});
router.post("/login", async (req, res) => {
  const { group, password } = req.body;
  try {
    const data = await User.find({ group: group });
    if (!data.length) {
      return res.json("danger:The username is incorrect please try again");
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
    const response = await new Data({ id: id });
    await response.save();
    res.json({data, alert:"success login successful"});
  } catch (error) {
    return res.send(error);
  }
});
router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    const data = await Data.find();
    res.json({user : user,data : data});
  } catch (error) {
    return res.send(error);
  }
});
module.exports = router;
