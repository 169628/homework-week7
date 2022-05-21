const success = (req,res,message)=>{
    res.send({
        status:"success",
        message
    })
}

const falsed = (req,res,code,message)=>{
    res.status(code).send({
        status:"error",
        message
    })

}

module.exports = { success, falsed};