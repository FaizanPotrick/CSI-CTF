const express = require("express");
const User = require("../model/userSchema");
const Data = require("../model/DataSchema");
const router = express.Router();

router.post("/register", async (req, res) => {
  const {
    group,
    firstMember,
    secondMember,
    thirdMember,
    fourthMember,
    password,
  } = req.body;
  try {
    const check = await User.find({ group: group });
    if (check.length) {
      return res.json("danger:This username has already been taken, please enter new username");
    }
    const response = await new User({
      group,
      firstMember,
      secondMember,
      thirdMember,
      fourthMember,
      password,
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
    const data = await User.find({ group: group, password: password });
    if (!data.length) {
      return res.json("danger:The username and password is incorrect please again");
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

// apne kaam a client ke nahi
// router.post("/get", async (req, res) => {
//   const { id } = req.body;
//   const data = await Data.find({ id: id });
//   if (!data.length) {
//     return res.json({ error: "Not Found" });
//   }
//   res.json(data);
// });

// router.post("/solution", async (req, res) => {
//   const { id, answer } = req.body;
//   console.log(req.body);
//   try {
//     const currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
//    await Data.updateOne(
//       { id: id, solution: {$elemMatch:{answer : answer}}},
//       { $set: { "solution.$.time":  currentTime} }
//     );
//     console.log("got");
//   } catch (error) {
//     console.log(error);
//   }
// });
module.exports = router;
