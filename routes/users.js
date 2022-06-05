var express = require('express');
var router = express.Router();

const usercontroller = require('../controllers/userController');
const err = require('../service/errorHandle/errorHanle');
const isMember = require('../middleware/isMember');

//註冊
router.post('/sign_up',err.handleErrorAsync(usercontroller.signUp));
//登入
router.post('/sign_in',err.handleErrorAsync(usercontroller.signIn));
//修改密碼
router.post('/updatePassword',isMember,err.handleErrorAsync(usercontroller.updatePassword));

module.exports = router;
