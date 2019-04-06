var express = require('express');
var app = express();
var mysql = require("./mySqlCalls.js");
var qs=require("querystring");
var path = require('path')

app.post('/', function(req, res, next) {
    console.log(req.body);
    var role = req.body.role;
    var permissions = req.body.permissions;
    var list = [];
    permissions.forEach(function(permission){
        list.push([role, permission])
    })
    var callback = function(err, result){
        if(err){
            console.log(err.message);
            res.redirect("/login?error="+qs.escape(err.message));
        }
        if(result === undefined){
            res.redirect("/login?error="+qs.escape("employee not found"));
        }else{
            // res.end(JSON.stringify(result));
            res.send(result)
        }
    }
    mysql.createRole(list, callback);
});

module.exports = app;