const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  id: {
    type: Number
  },
  username: {
    type: String
  },
  growid: {
    type: String,
    default: null
  },
  joined: {
    type: Number
  },
  verified: {
    type: Boolean,
    default: false
  },
  trusted: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String,
    default: null
  },
  banner: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    default: "I am a very mysterious person."
  },
  discord: {
    type: String,
    default: null
  },
  token: {
    type: String
  },
  badges: {
    type: Array,
    default: []
  }
});

module.exports = model("users", userSchema);