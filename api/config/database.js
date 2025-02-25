const connection = require('./sqlconnection')
const stringConstant = require('../config/stringconstant')
exports.executeQuery = (sp,data,res,callback)=>{
    connection.query(sp,data,(err,result)=>{
        if(!err){
            callback(null,result)
        }else{
            res.status(503).json({status:503,message:stringConstant.SOMETHINGWENTWRONG,data:{}})
        }
    })
}