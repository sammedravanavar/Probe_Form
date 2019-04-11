var express = require('express');
var app = express();
var mysql = require("./mySqlCalls.js");
var qs=require("querystring");
var path = require('path')

app.get('/', function(req, res, next) {
    // console.log(req.body);
    // var type = req.session.type;
    var callback = function(err, result){
        if(err){
            console.log(err.message);
            res.redirect("/login?error="+qs.escape(err.message));
        }
        if(result.length==0){
            res.redirect("/login?error="+qs.escape("employee not found"));
        }else{
           res.send(result);
        //    res.end(result);
        }
    }
    mysql.getAllTypes(callback);
    // res.send({'permissions':['add_users','review_users','add_questions','review_questions','create_role','skill_matrix']})
});

module.exports = app;