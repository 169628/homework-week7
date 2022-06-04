var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postRouter = require('./routes/post');
var err = require('./service/errorHandle/errorHanle');

var app = express();

//重大錯誤
process.on('uncaughtException',err.uncaughtException);

//連接資料庫
require("./connection");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postRouter);

//404錯誤
app.use(err.error404);

//express錯誤處理,回傳至前台
app.use(err.resErrorProd);

// 未捕捉到的 catch 
process.on('unhandledRejection',err.unhandledRejection);

module.exports = app;
