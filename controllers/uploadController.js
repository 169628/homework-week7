const response = require("../service/response");
const err = require("../service/errorHandle/errorHanle");
const { ImgurClient } = require('imgur');

const uploadController = async (req,res, next)=>{
    if(!req.files.length) {
        return next(err.appError(400,"您沒有上傳圖片",next));
    }
    const client = new ImgurClient({
        clientId: process.env.IMGUR_CLIENTID,
        clientSecret: process.env.IMGUR_CLIENT_SECRET,
        refreshToken: process.env.IMGUR_REFRESH_TOKEN,
    });
    const imgResponse = await client.upload({
        image: req.files[0].buffer.toString('base64'),
        type: 'base64',
        album: process.env.IMGUR_ALBUM_ID
    });
    response(res,{imgUrl: imgResponse.data.link})
}

module.exports = uploadController