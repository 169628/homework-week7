var express = require('express');
var router = express.Router();

const postController = require('../controllers/postController');
const err = require('../service/errorHandle/errorHanle');

//get all post
router.get('/',err.handleErrorAsync(postController.get));
// post
router.post('/',err.handleErrorAsync(postController.post));

module.exports = router;
