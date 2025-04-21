const express = require('express');
const router = express.Router();
const { uploads, upload } = require('../Controllers/PdfController');
const userAuth = require('../Middleware/Auth.js');

router.post('/upload',userAuth,upload, uploads);

module.exports = router;
