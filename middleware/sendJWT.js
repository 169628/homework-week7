const jwt = require('jsonwebtoken');
const response = require('../service/response');

const sendJWT= (user,res)=>{
	const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_DAY
    });
	user.password = undefined;
    response(res,{
        user:{
            token,
            name: user.name
        }
    })
}

module.exports = sendJWT;