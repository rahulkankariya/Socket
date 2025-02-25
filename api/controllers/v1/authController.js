const authService = require('../../services/v1/authService')
const validation = require('../../validation/v1/auth')
exports.login = async(req,res)=>{
    try {
        const {error} = validation.signup(req.body);
        if(error){
            return res.status(200).send({
                status: 400,
                message: error.details[0].message,
                data: {},
              });
        }else{

        }
    } catch (error) {
        
    }
}