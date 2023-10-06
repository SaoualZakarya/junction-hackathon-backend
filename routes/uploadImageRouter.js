const express = require('express');
const router = express.Router();
const uploadMiddleWare = require('../middleware/handleUpload');
const uploadImageController = require('../controller/uploadImageController');

router.post('/',uploadMiddleWare.single('image'),uploadImageController);

module.exports = router;