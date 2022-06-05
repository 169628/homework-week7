const success = (res,message)=>{
    res.send({
        status:'success',
        message
    })
}


module.exports = success;