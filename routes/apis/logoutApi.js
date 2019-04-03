var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res, next) {
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }else{
            // res.redirect("/login");
            res.sendFile('login.html',{
                root:path.join(__dirname,'../../views')
            })
        }
    });

});

module.exports = app