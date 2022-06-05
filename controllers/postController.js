const mongoose = require("mongoose");
const Post = require("../models/postModel");
const response = require("../service/response");
const err = require("../service/errorHandle/errorHanle");

const get = async (req,res)=>{
    const timeSort = req.query.timeSort == "asc" ? "createDate":"-createDate"
    const q = req.query.q !== undefined ? {"content": new RegExp(req.query.q)} : {};
    const getPost = await Post.find(q).populate({
        path: "userId",
        select: "name photo",
    }).sort(timeSort);
    response(req,res,getPost)
}

const post = async (req, res, next) => {
    const { body } = req;
        if(!body.userId || !body.content){
            return next(err.appError(400,"請填寫正確內容",next));
        }else{
            const addPost = await Post.create({
                userId: body.userId,
                like: body.like,
                image: body.image || "https://i.imgur.com/vMMdWt5.jpg",
                content: body.content,
                comment: body.Comment
            })
            response(req,res,addPost);
        }

}

module.exports = { get , post};