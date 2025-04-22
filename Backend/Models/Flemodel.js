const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  resumeUrl: String,
  jdUrl: String,
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FileUpload", fileSchema);
