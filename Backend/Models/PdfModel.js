const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  resumePath: { type: String, required: true },
  jdPath: { type: String, required: true },
  resumeFilename: { type: String, required: true },
  jdFilename: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('File', fileSchema);
