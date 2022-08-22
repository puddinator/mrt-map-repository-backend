const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  station: String,
  image: String,
  comments: [{ text: String, date: { type: String, default: new Date() } }],
});

module.exports = mongoose.model("Image", imageSchema);
