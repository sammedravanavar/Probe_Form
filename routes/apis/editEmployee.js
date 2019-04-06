var express = require('express');
var app = express();
var mysql = require("./mySqlCalls.js");
var qs=require("querystring");
var path = require('path')

app.post('/', function(req, res, next) {
    // console.log(req.body);
    var sapientId = req.session.sapientId;
    var name = req.body.name;
    var email = req.body.email;
    var type = req.session.type;
    var designation = req.body.designation;
    // console.log("this"+sapientId)
    var callback = function(err, result){
        if(err){
            console.log(err.message);
            res.redirect("/login?error="+qs.escape(err.message));
        }
        if(result.length==0){
            res.redirect("/login?error="+qs.escape("employee not found"));
        }else{
            // var employee=result[0];
            res.send(result);
        }
    }
    mysql.editProfile(sapientId,name,email,type,designation, callback);
});

module.exports = app;