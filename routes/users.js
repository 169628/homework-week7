var express = require('express');
var router = express.Router();

const usercontroller = require('../controllers/userController');
const err = require('../service/errorHandle/errorHanle');
const isAuth = require('../middleware/isMember');

//註冊
router.post('/sign_up',err.handleErrorAsync(usercontroller.signUp));
//登入
router.post('/sign_in',err.handleErrorAsync(usercontroller.signIn));
//修改密碼
router.post('/updatePassword',isAuth,err.handleErrorAsync(usercontroller.updatePassword));
//取得個人資料
router.get('/profile',isAuth,err.handleErrorAsync(usercontroller.profile));
//更新個人資料
router.post('/profile',isAuth,err.handleErrorAsync(usercontroller.updateProfile));


module.exports = router;
