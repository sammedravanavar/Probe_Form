var express = require('express');
var app = express();
var path = require('path')

app.get('/', function(req, res, next) {
    if(req.session.email){
        res.sendFile('dashboard.html',{
            root:path.join(__dirname,'../views')
        });
    }else{
        if(!req.query.error){
            res.sendFile('login.html',{
                root:path.join(__dirname,'../views')
            });
        }
    }
});

module.exports = app;
