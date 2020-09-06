const { Schema, model } = require("mongoose");

const bannerSchema = new Schema({
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

module.exports = model("banners", bannerSchema);