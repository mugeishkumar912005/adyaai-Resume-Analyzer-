const multer = require('multer');
const path = require('path');
const fs = require('fs');
const File = require('../Models/PdfModel.js');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userEmail = req.user?.Email;
    if (!userEmail) return cb(new Error('User not authenticated'), null);

    const userDir = path.join(__dirname, '..', 'files', userEmail);
    fs.mkdirSync(userDir, { recursive: true });
    cb(null, userDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    const field = file.fieldname === 'resumeFile' ? 'resume' : 'jd';
    cb(null, `${uniqueSuffix}-${field}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage }).fields([
  { name: 'resumeFile', maxCount: 1 },
  { name: 'jdFile', maxCount: 1 },
]);

const uploads = async (req, res) => {
  try {
    const { resumeFile, jdFile } = req.files;
    const userEmail = req.user.Email;

    if (!resumeFile || !jdFile) {
      return res.status(400).json({ error: 'Both resume and JD files are required.' });
    }

    const fileRecord = await File.create({
      userEmail,
      resumePath: resumeFile[0].path,
      jdPath: jdFile[0].path,
      resumeFilename: resumeFile[0].filename,
      jdFilename: jdFile[0].filename,
    });

    res.status(200).json({
      message: 'Files uploaded successfully',
      data: fileRecord,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = { uploads, upload };
