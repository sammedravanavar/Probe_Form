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
            res.redirect("/login?error="+qs.escape(err.message));
        }
        if(result===undefined){
            res.redirect("/login?error="+qs.escape("employee not found"));
        }else{
            res.send(result);
        }
    }
    mysql.addUser(["145004","sammed","samravan@publicissapient.com","123456","super_admin","sss","approved"], callback);
});

module.exports = app;