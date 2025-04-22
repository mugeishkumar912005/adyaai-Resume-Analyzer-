const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const UserRoutes = require('./Routes/UserRoutes.js');
const Resumeroute = require("./Routes/Resumeroute.js");
const HistoryRoutes = require("./Routes/HistoryRoutes.js");
const { DbConnection } = require('./Dbconfig.js');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dsq0ebnj6',
  api_key: '693565251951853',
  api_secret: 'Fk3XYttHytn_Dy_J2t6hyDtYigM',
});

// Define File Schema
const fileSchema = new mongoose.Schema({
  resumeUrl: { type: String, required: true },
  jdUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Create File Model
const FileModel = mongoose.model('cloudfile', fileSchema);

// Multer Memory Storage
const storage = multer.memoryStorage(); 
const upload = multer({ storage });

const app = express();

app.use(bodyParser.json());
app.use(express.json());

// Enable CORS for specific domains
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://adyaai-resume-analyzer-frontend-app.onrender.com' 
    : 'http://localhost:5174',
  methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization'
}));

app.set("view engine", "ejs");

// Function to upload files to Cloudinary manually
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "uploads", public_id: file.fieldname + "-" + Date.now() },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

// File upload endpoint
app.post("/api/uploads/upload", upload.fields([
  { name: "resumeFile", maxCount: 1 },
  { name: "jdFile", maxCount: 1 },
]), async (req, res) => {
  try {
    const resumeFile = req.files["resumeFile"]?.[0];
    const jdFile = req.files["jdFile"]?.[0];

    if (!resumeFile || !jdFile) {
      return res.status(400).json({ error: "Both files are required" });
    }

    // Upload files to Cloudinary
    const resumeUpload = await uploadToCloudinary(resumeFile);
    const jdUpload = await uploadToCloudinary(jdFile);
    console.log(resumeUpload, jdUpload);

    // Save URLs to MongoDB
    const fileRecord = new FileModel({
      resumeUrl: resumeUpload.secure_url,
      jdUrl: jdUpload.secure_url
    });
    await fileRecord.save();

    res.json({
      resumeUrl: resumeUpload.secure_url,
      jdUrl: jdUpload.secure_url,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Something went wrong during upload" });
  }
});

// Other routes
app.use("/api/user", UserRoutes);
app.use("/api/upload", Resumeroute);
app.use("/api/history", HistoryRoutes);

app.get("/api/health", (req, res) => res.send("OK"));

// Database connection
DbConnection; // Assuming this is a function that handles the connection

const PORT = process.env.PORT || 6200;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});