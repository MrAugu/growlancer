const { Schema, model } = require("mongoose");

const avatarSchema = new Schema({
  hash: {
    type: String
  },
  content: {
    type: String
  },
  type: {
    type: String
  },
  for: {
    type: Number
  },
  format: {
    type: String,
    default: "base64"
  }
});

module.exports = model("avatars", avatarSchema);