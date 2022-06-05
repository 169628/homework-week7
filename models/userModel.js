const mongoose = require("mongoose");

//是否增加修改時間???

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"暱稱必填"]
    },
    sex:{
        type: String,
        enum:["male","female"]
    },
    photo:{
        type: String,
        default: "https://i.imgur.com/vMMdWt5.jpg"
    },
    role: {
        type: String,
        enum:["member","visitor"]
    },
    mail:{
        type: String,
        required:[true,"e-mail必填"],
        select: false
    },
    password:{
        type: String,
        required:[true,"密碼必填"],
        minlength: 6,
        select:false
    },
    like:{
        type:[{
            postId:{
                type: mongoose.Schema.ObjectId,
                ref: 'Post',
                required: [true, '使用者資訊未填寫']
            },
            date:{
                type: Date,
                default: Date.now
            }
        }],
        default: []
    },
    follow:{
        type:[{
            userId:{
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: [true, '使用者資訊未填寫']
            },
            date:{
                type: Date,
                default: Date.now
            }
        }],
        default: []
    },
    fans:{
        type:[{
            userId:{
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: [true, '使用者資訊未填寫']
            },
            date:{
                type: Date,
                default: Date.now
            }
        }],
        default: []
    }
},{
    versionKey: false
})

const User = mongoose.model("user",userSchema);

module.exports = User;