var express = require('express');
var router = express.Router();

const err = require('../service/errorHandle/errorHanle');
const isAuth = require('../middleware/isMember');
const uploadController = require('../controllers/uploadController');
const upload = require('../middleware/image');

//upload
router.post('',isAuth,upload,err.handleErrorAsync(uploadController));



module.exports = router;