var express = require('express');
var app = express();
var mysql = require("./mySqlCalls.js");
var qs=require("querystring");
var path = require('path')

app.post('/', function(req, res, next) {
    //console.log(req.body);
    var email = req.body.email;
    var pass = req.body.pass;

    var callback = function(err, result){
        if(err){
            console.log(err.message);
            res.redirect("/login?error="+qs.escape(err.message));
        }
        if(result.length==0){
            res.redirect("/login?error="+qs.escape("Please check your username and password"));
        }else{
            var employee=result[0];
            if(employee["type"]){
                req.session.sapientId = employee["sapientId"]
                req.session.email = employee["email"];
                req.session.type = employee["type"];
                if(req.session.type){
                    // res.sendFile('dashboard.html',{
                    //     root:path.join(__dirname,'../../views')
                    // });
                    res.send(result);
                } 
            } else{
                console.log('user may be a candidate')
            }
        }
    }
    mysql.login(email, pass, callback);
});

module.exports = app;