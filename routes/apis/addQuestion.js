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
        }
    }
    mysql.addQuestion(callback);
});

module.exports = app;