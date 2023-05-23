const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  songname: {
    type: String,
    // required: true
  },

  film: {
    type: String,
    // required: true
  },
  musicdirector: {
    type: String,

    // required: true
  },
  singer: {
    type: String,

    // required: true
  },
//   actorname:{
//     type: String,
//   },
//   actressname:{
//     type: String,
//   }
});

module.exports = mongoose.model("User", userSchema);