const mongoose = require("mongoose");
const Post = require("../models/postModel");
const response = require("../controllers/response");

const get = async (req,res)=>{
    const getPost = await Post.find();
    response.success(req,res,getPost)
}

const post = async (req, res, next) => {
    try {
        const { body } = req;
        if(!body.userId || !body.content){
            response.falsed(req,res,400,"請正確填寫內容");
        }else{
            const addPost = await Post.create({
                userId: body.userId,
                like: body.like,
                image: body.image || "https://i.imgur.com/vMMdWt5.jpg",
                content: body.content,
                Comment: body.Comment
            })
            response.success(req,res,addPost);
        }
        
    } catch (err) { 
        next(err)
    }

}

module.exports = { get , post};