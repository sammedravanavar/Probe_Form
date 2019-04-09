var express = require('express');
var app = express();
var path = require('path');
var utility = require('../utilities');

app.get('/', function(req, res, next) {
	if(!utility.checkSesssion(req, res))
		return;
		
	res.sendFile('index.html',{
		root: path.join(__dirname,'../../views/super_admin')
	})
});

app.get('/reviewUsers',function(rq,res){
    res.sendFile('reviewUsers.html',{
        root:path.join(__dirname,'../../views')
    });
})
app.get('/reviewQuestions',function(rq,res){
    res.sendFile('reviewQuestions.html',{
        root:path.join(__dirname,'../../views')
    });
})

module.exports = app;