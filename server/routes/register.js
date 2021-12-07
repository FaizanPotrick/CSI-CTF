const express = require("express");
const User = require("../model/userSchema");
const Data = require("../model/DataSchema");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { group, password } = req.body;
  if (!group || !password) {
    return res.status(422).json({ error: "the data is not filled" });
  }
  try {
    const check = await User.findOne({ group: group });
    if (check) {
      return res
        .status(422)
        .json({ error: "This data has already been taken" });
    }
    const response = await new User({
      group,
      password,
    });
    await response.save();
    res.json(response);
  } catch (error) {
    res.send(error);
  }
});
router.post("/login", async (req, res) => {
  const { group, password } = req.body;
  const data = await User.find({ group: group, password: password });
  if (!data.length) {
    return res.json({ error: "Not Found" });
  }
  res.json(data);
});

router.post("/data", async (req, res) => {
  const { id, solution } = req.body;
  if (!id || !solution.length) {
    return res.status(422).json({ error: "the data is not filled" });
  }
  try {
    const check = await Data.findOne({ id: id });
    if (check) {
      return res
        .status(422)
        .json({ error: "This data has already been taken" });
    }
    const response = await new Data({
      id,
      solution,
    });
    await response.save();
    res.json(response);
  } catch (error) {
    res.send(error);
  }
});
router.post("/get", async (req, res) => {
  const { id } = req.body;
  const data = await Data.find({ id: id });
  if (!data.length) {
    return res.json({ error: "Not Found" });
  }
  res.json(data);
});
router.post("/solution", async (req, res) => {
  const { id, answer } = req.body;
  console.log(req.body);
  const data = await Data.find(
    { id: id },
    { solution: { $elemMatch: { answer: answer } } }
  );

  if (!data[0].solution.length) {
    return res.json({ error: "Not Found" });
  }
    res.json(data[0].solution[0]);
 const update = await Data.findOneAndUpdate({_id : data[0].solution[0]._id},{answer : "my"});
 console.log(update);
});
module.exports = router;
