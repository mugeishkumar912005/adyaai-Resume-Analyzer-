const express = require('express');
const router = express.Router();
const userAuth = require('../Middleware/Auth.js');
const {HistoryController, GetHistory} = require('../Controllers/HistoryController.js');

router.post('/Data',userAuth,HistoryController);
router.get('/GetData',userAuth,GetHistory);

module.exports = router;
