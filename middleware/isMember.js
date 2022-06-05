const jwt = require('jsonwebtoken');
const err = require('../service/errorHandle/errorHanle');
const User = require('../models/userModel');

const member = async (req, res, next) => {
    let token =''
    if (
        req.headers.authorization && req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return next(err.appError(400,'你尚未登入！',next));
    }
    const decoded = await new Promise((resolve,reject)=>{
        jwt.verify(token,process.env.JWT_SECRET,(error,payload)=>{
        if(error){
            reject(err.appError(400,"網頁停滯過久，請重新登入",next));
        }else{
            resolve(payload)
        }
      })
    })
    const currentUser = await User.findById(decoded.id);
    if(!currentUser){
        return next(err.appError(400,"無此使用者",next));
    }
    req.user = currentUser;
    next();
  }

  module.exports = member;