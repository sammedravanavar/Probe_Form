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
            res.end(JSON.stringify(result));
        }
    }
    var text = req.body.text;
    var op1 = req.body.op1;
    var op2 = req.body.op2;
    var op3 = req.body.op3;
    var op4 = req.body.op4;
    var op5 = req.body.op5;
    var answer = req.body.answer;
    var careerStage = req.body.careerStage;
    var difficulty = req.body.difficulty;
    var technology = req.body.technology;
    mysql.addQuestion({text:text,op1:op1,op2:op2,op3:op3,op4:op4,op5:op5,answer:answer,
careerStage:careerStage,difficulty:difficulty,technology:technology,status:"approved"}, callback);
//     mysql.addQuestion({text:"nhnji",op1:"op1",op2:"op2",op3:"op3",op4:"op4",op5:"op5",answer:"answer",
// careerStage:"careerStage",difficulty:"dif",technology:"tech",status:"approved"}, callback);
});

module.exports = app;