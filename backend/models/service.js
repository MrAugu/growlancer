const { Schema, model } = require("mongoose");

const serviceSchema = new Schema({
  id: {
    type: String
  },
  owner: {
    type: Number
  },
  title: {
    type: String
  },
  shortDescription: {
    type: String
  },
  longDescription: {
    type: String
  },
  banner: {
    type: String
  },
  cardBanner: {
    type: String
  },
  tiers: {
    type: Array
  },
  verified: {
    type: Boolean,
    default: false
  },
  visible: {
    type: Boolean,
    default: true
  },
  approved: {
    type: Boolean,
    default: false
  },
  moderator: {
    type: Number
  },
  partner: {
    type: Boolean,
    default: false
  },
  created: {
    type: Number
  },
  keywords: {
    type: Array
  },
  views: {
    type: Array,
    default: []
  },
  upvotes: {
    type: Array,
    default: []
  },
  downvotes: {
    type: Array,
    default: []
  },
  rates: {
    type: Array,
    default: []
  },
  rating: {
    type: Number,
    default: 0
  }
});

module.exports = model("services", serviceSchema);