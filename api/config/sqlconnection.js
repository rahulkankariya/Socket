const mysql = require('mysql2')
const config = require('../config/config')
console
const connection = mysql.createConnection({
    host:config.DBHOST,
    user:config.DBUSERNAME,
    password:config.DBPASSWORD,
    database:config.database
})
connection.connect((err)=>{
    if(!err){
        console.log("Databse is connected")
    }else{
        console.log("Not Connected",err)
    }
})
module.exports = connection;