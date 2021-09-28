const mysql = require("mysql");
// const awsConfig = require("../config/awsConfig");
// const envConfig = require("../config/envConfig");

var mySql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Yash3$12',
    database: 'serverless'
  })
  
  mySql.connect((err)=>{
      if(!err)console.log("Connected");
       else console.log("Connection Failed");
  });
  
  module.exports = mySql;
  