const mongoose = require("mongoose");
const User = require("../models/userModel");

//未細改
const post = async (req, res) => {
    try {
        const { body } = req;
        const addUser = {
            name: body.name,
            sex: body.sex,
            photo: body.photo || "https://i.imgur.com/vMMdWt5.jpg",
            role: body.role || "visitor",
            mail: body.mail,
            password: body.password,
            like: body.like,
            follow: body.follow,
            fans: body.fans
        }
        await User.create(addUser);
        res.send("success");
    } catch (err) { 
        console.log(err)
    }

}

module.exports = {post};