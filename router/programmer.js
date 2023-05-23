const express = require("express");
const router = express.Router();
const User = require("./../models/user");

var users = [];

router.get("/", async (req, res) => {
  try {
    // Filtering for only the users with division 10
    users = await User.find();
    res.send(users);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user2 = await User.findById(req.params.id);
    res.send(user2);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    rollno: req.body.rollno,
    division: req.body.division,
  });
  try {
    users = await user.save();
    res.send(users);
  } catch (err) {
    console.log("Error!!...." + err);
    res.send("Error!" + err);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const user1 = await User.findById(req.params.id);
    user1.division = req.body.division;
    users = await user1.save();
    res.send(users);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    users = await User.findByIdAndDelete(req.params.id);
    res.send("User deleted");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router
