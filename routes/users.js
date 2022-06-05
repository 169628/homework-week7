var express = require('express');
var router = express.Router();

const usercontroller = require('../controllers/userController');
const err = require('../service/errorHandle/errorHanle');

//註冊
router.post('/sign_up',err.handleErrorAsync(usercontroller.signUp));

module.exports = router;
