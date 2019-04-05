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
        if(result === undefined){
            res.redirect("/login?error="+qs.escape("employee not found"));
        }else{
            res.end(JSON.stringify(result));
        }
    }
    mysql.addQuestion({text:"nhnji",op1:"op1",op2:"op2",op3:"op3",op4:"op4",op5:"op5",answer:"answer",
careerStage:"careerStage",difficulty:"dif",technology:"tech",status:"approved"}, callback);
});

module.exports = app;