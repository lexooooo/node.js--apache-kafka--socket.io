const express = require('express');
const router = express.Router();
const controller = require('./controller.js');


router.post('/', controller.updater);
 

module.exports = router;