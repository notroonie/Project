const express = require("express");
const router = express.Router();
const User = require("./../models/user");

var users = [];

router.get("/", async (req, res) => {
  try {
    // Filtering for only the users with division 10
    // users = await User.find();
    users = await User.find({
        singer: "djskdhsad",
        film: "abc"
    });
    // const count = await music.collection("users").countDocuments();
    res.send(users);
  } catch (err) {
    console.log(err);
  }
});


// router.get("/", async (req, res) => {
//     try {
//       users = await User.find();
//       // users = await User.find({
//       //     singer: "djskdhsad",
//       //     film: "abc"
//       // });
//       const count = await music.collection(users).countDocuments();
//       res.send(count);
//     } catch (err) {
//       console.log(err);
//     }
//   });




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
    songname: req.body.songname,
    film: req.body.film,
    musicdirector: req.body.musicdirector,
    singer:req.body.singer,
    // actorname: req.body.actorname,
    // actressname: req.body.actressname
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
    user1.songname = req.body.songname;
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
