var express = require('express');
var router = express.Router();

const postController = require("../controllers/postController");

//get all post
router.get('/',postController.get);
//get all post
router.post('/',postController.post);

module.exports = router;
