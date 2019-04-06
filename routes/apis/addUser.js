var express = require('express');
var app = express();
var mysql = require("./mySqlCalls.js");
var qs=require("querystring");
var path = require('path')

app.post('/', function(req, res, next) {
    // console.log(req.body);
    var callback = function(err, result){
        if(err){
            console.log(err.message);
            res.sendFile('error.html',{
                root:path.join(__dirname,'../../views')
            });
        }
        if(result===undefined){
            res.sendFile('error.html',{
                root:path.join(__dirname,'../../views')
            });
        }else{
            res.send(result);
            // res.sendFile('index.html',{
            //     root:path.join(__dirname,'../../views/super_admin')
            // });
        }
    }
    
    var auth = req.session.type;
    var sapientId = req.body.sapientId;
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var type = req.body.type;
    var designation = req.body.designation;
    console.log(name+email+designation)
    if(auth=='super_admin') mysql.addUser([sapientId,name,email,password,type,designation,"approved"],callback)
    else mysql.addUser([sapientId,name,email,password,type,designation,"pending"],callback)
    // mysql.addUser(["145004","sammed","samravan@publicissapient.com","123456","super_admin","sss","approved"], callback);
});

module.exports = app;