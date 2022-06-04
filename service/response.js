const success = (req,res,message)=>{
    res.send({
        status:'success',
        message
    })
}


module.exports = success;