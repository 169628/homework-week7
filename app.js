var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postRouter = require('./routes/post');

var app = express();

//連接資料庫
require("./connection");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/post', postRouter);

//404錯誤
app.use((req, res) => {
    res.status(404).send({
        status: "error",
        message: "無此路由"
    })
})

//express錯誤處理
app.use((err, req, res, next) => {
    res.status(500).send({
        status: "error",
        message: "系統錯誤，請洽管理員"
    })
})

module.exports = app;
