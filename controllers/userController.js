const mongoose = require('mongoose');
const User = require('../models/userModel');
const err =require('../service/errorHandle/errorHanle');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const sendJWT = require('../middleware/sendJWT');

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
        return next(err.appError(400,'密碼字數低於 6 碼',next));
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

module.exports = {signUp};