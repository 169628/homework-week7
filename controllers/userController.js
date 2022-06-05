const User = require('../models/userModel');
const err =require('../service/errorHandle/errorHanle');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const sendJWT = require('../middleware/sendJWT');
const response = require('../service/response');


//註冊
const signUp = async (req, res, next) => {
    let { email, password,confirmPassword,name } = req.body;
    if(!email||!password||!confirmPassword||!name){
        return next(err.appError(400,'欄位未填寫正確！',next));
    }
    if(password!==confirmPassword){
        return next(err.appError(400,'密碼不一致！',next));
    }
    if(!validator.isLength(password,{min:6})){
        return next(err.appError(400,'密碼字數不可低於 6 碼',next));
    }
    if(!validator.isEmail(email)){
        return next(err.appError(400,'Email 格式不正確',next));
    }
    const emailCheck = await User.find({mail:email});
    console.log(emailCheck);
    if(emailCheck.length > 0){
        return next(err.appError(400,'您已註冊過，請按登入',next));
    }
    password = await bcrypt.hash(req.body.password,12);
    const newUser = await User.create({
        mail: email,
        password,
        name,
        sex:'male',
        role: 'member',
    });
    sendJWT(newUser,res);
}

//登入
const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(err.appError( 400,'帳號密碼不可為空',next));
    }
    if(!validator.isLength(password,{min:6})){
        return next(err.appError(400,'密碼字數不可低於 6 碼',next));
    }
    const user = await User.findOne({ mail: email }).select('+password');
    if(user === null){
        return next(err.appError(400,'無此使用者,請註冊',next));
    }
    const auth = await bcrypt.compare(password, user.password);
    if(!auth){
        return next(err.appError(400,'您的密碼不正確',next));
    }
    sendJWT(user,res);
}

//修改密碼
const updatePassword = async (req, res, next) => {
    const {password,confirmPassword } = req.body;
    if(password!==confirmPassword){
        return next(err.appError("400","密碼不一致！",next));
    }
    if(!validator.isLength(password,{min:6})){
        return next(err.appError(400,'密碼字數不可低於 6 碼',next));
    }
    newPassword = await bcrypt.hash(password,12);
    const user = await User.findByIdAndUpdate(req.user.id,{
        password:newPassword
    });
    sendJWT(user,res);
}

//取得個人資料
const profile = async (req, res, next) => {
    response(res,req.user)
}

//更新個人資料
const updateProfile = async (req, res, next) => {
    let { photo, name, sex } = req.body;
    if(!photo && !name && !sex){
        return next(err.appError(400,"您沒有更新任何資料",next));
    }else{
        await User.findByIdAndUpdate(req.user._id,{
            photo,
            name,
            sex
        })
        const newProfile = await User.findById(req.user._id);
        response(res,newProfile);
    }
}



module.exports = {
    signUp,
    signIn,
    updatePassword,
    profile,
    updateProfile
};