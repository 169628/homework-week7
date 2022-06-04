

//404錯誤
const error404 = (req, res) => {
    res.status(404).send({
        status: 'error',
        message: '無此路由'
    })
}

//重大錯誤
const uncaughtException = err => {
    console.error('Uncaughted Exception！')
    console.error(err);
    process.exit(1);
}

// 未捕捉到的 catch 
const unhandledRejection = (err, promise) => {
    console.error('未捕捉到的 rejection：', promise, '原因：', err);
}

//可預期錯誤
const appError = (httpStatus, errMessage, next) => {
    const error = new Error(errMessage);
    error.statusCode = httpStatus;
    error.isOperational = true;
    next(error);
};

//回傳至前台
const resErrorProd = (err,req,res,next) => {
    //開發模式
    if(process.env.NODE_ENV === 'dev'){ 
        res.status(err.statusCode).json({
            message: err.message,
            error: err, //是否被訂為可預期會出現在這裡
            stack: err.stack
        })
    }
    //以下為非開發模式
    else if (err.isOperational) { //可預期錯誤
        res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }else if (err.name === 'ValidationError'){ //沒預期到的欄位資訊錯誤
        res.status(err.statusCode || 400).json({
            status: 'error',
            message: '資料欄位未填寫正確，請重新輸入'
        });
    }else { //不可預期錯誤
        // log 紀錄
        console.error('出現重大錯誤', err);
        // 送出罐頭預設訊息
        res.status(500).json({
            status: 'error',
            message: '系統錯誤，請恰系統管理員'
        });
    }
};

//取代 try & catch
const handleErrorAsync = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch((err) => {
            next(err)
        })

    }
}




module.exports ={ 
    appError, 
    error404, 
    resErrorProd, 
    handleErrorAsync, 
    uncaughtException,
    unhandledRejection
}