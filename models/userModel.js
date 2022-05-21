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
    },
    password:{
        type: String,
        required:[true,"密碼必填"],
        minlength: 8,
        select:false
    },
    like:[{
        postId:{
            type:String,
            required:[true,"postId必填"]
        },
        date:{
            type:Date,
            default: Date.now
        }
    }],
    follow:[{
        userId:{
            type:String,
            required:[true,"userId必填"]
        },
        date:{
            type: Date,
            default: Date.now
        }
    }],
    fans:[{
        userId:{
            type:String,
            required:[true,"userId必填"]
        },
        Date:{
            type: Date,
            default: Date.now
        }
    }]
},{
    versionKey: false
})

const User = mongoose.model("user",userSchema);

module.exports = User;