const mongoose = require('mongoose');

const HistoryItemSchema = new mongoose.Schema({
  Resume_Degree: { type: String, required: true },
  JD_Degree: { type: String, required: true },
  Resume_CGPA: { type: String, required: true },
  JD_CGPA: { type: String, required: true },
  Score: {
    Edu: { type:String, required: true },  
    Overall: { type:String, required: true },  
    skills: { type: String, required: true }  
  },
  Suggestions:[String],
  createdAt: { type: Date, default: Date.now }
});

const UserHistorySchema = new mongoose.Schema({
  userEmail: { type: String, required: true, unique: true }, // Keep consistent naming here
  history: [HistoryItemSchema]
});

module.exports = mongoose.model('UserHistory', UserHistorySchema);
