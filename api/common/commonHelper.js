const config = require('../common/config')
const jwt = require('jsonwebtoken')
const  CryptoJS = require("crypto-js");
const storeProcudures = require('../common/storeProcdure')
const database = require('../common/database')
module.exports = {
    encryptPassword :(password)=>{
        const ciphertext = CryptoJS.AES.encrypt(password, config.PASSWORDKEY).toString();
        return ciphertext
    },
    decryptPassword :(password)=>{
        var bytes  = CryptoJS.AES.decrypt(password, config.PASSWORDKEY);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText
    },
    generateJwTToken(data){
        let token = jwt.sign(data,config.JWTKEY,{
            expiresIn:"365days"
        })
        return token
    },
    validateToken:(req,res)=>{
        return new Promise((resolve,reject) => {
            try {
               console.log("req.dec==>",req.decoded)
                
                database.executeQuery(
                    storeProcudures.validateToken,[
                        req.decoded.uniqueId,
                        req.decoded.id
                    ],
                    res, function(err,rows){
                        if(rows[0][0].res){
                            resolve({ executed: 1, data: {} });
                        }else{
                            resolve({ executed: 0, data: {} });
                        }
                })
            } catch (error) {
                reject({ executed: 0, data: {} });
            }
        })
    },
    validateSocketToken:(socket)=>{
        return new Promise((resolve,reject) => {
            try {
              
                    console.log("Socket==?",socket)
                database.executeQuery(
                    storeProcudures.validateToken,[
                        socket.uniqueId,
                        socket.id
                    ],
                    '', function(err,rows){
                        if(rows[0][0].res){
                            resolve({ executed: 1, data: {} });
                        }else{
                            resolve({ executed: 0, data: {} });
                        }
                })
            } catch (error) {
                reject({ executed: 0, data: {} });
            }
        })
    },
  

}