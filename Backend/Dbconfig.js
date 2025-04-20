const mongoose = require('mongoose');
require('dotenv').config();

const DbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ DB Connection Success");
  } catch (error) {
    console.error("❌ DB Connection Error:", error);
  }
};
DbConnection();
