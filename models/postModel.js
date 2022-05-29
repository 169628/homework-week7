const mongoose = require("mongoose");

//是否增加修改時間???

const postSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required:[true,"姓名必填"]
    },
    createDate:{
        type:Date,
        default: Date.now
    },
    like:[{
        userId:{
            type: mongoose.Schema.ObjectId,
            ref: 'userModel',
            required:[true,"姓名必填"]
        },
        date:{
            type:Date,
            default: Date.now
        }
    }],
    image:{
        type: String,
        default: "https://i.imgur.com/vMMdWt5.jpg"
    },
    content:{
        type: String,
        required:[true,"內容必填"]
    },
    commnet:[{
        userId:{
            type: mongoose.Schema.ObjectId,
            required:[true,"姓名必填"]
        },
        message:{
            type: String,
            required:[true,"內容必填"]
        }

    }]
},{
    versionKey: false
})

const Post = mongoose.model("post",postSchema);

module.exports = Post;