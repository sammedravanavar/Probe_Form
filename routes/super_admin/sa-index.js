var express = require('express');
var app = express();
var path = require('path');
// var mySqlCalls = require('../apis/mySqlCalls');
var utility = require('../utilities');

app.get('/', function(req, res, next) {
	if(!utility.checkSesssion(req, res))
		return;

	var type;
	var auth = true;

	if(!utility.checkGetParam(req,res)){
		type = req.session.type;
	}
	else{
		if(req.session.type != "super_admin"){
			auth = false;
		}
		type = req.query.type;
	}

	if(type !== 'super_admin'){
		res.redirect("/error/401");
		return;
	}
// function callback(err,results){
//   var type = req.session.type;
//   res.render('super_admin/index', { title: 'Express', type:"index", data:results, authType:type, departmentId:req.session.departmentId, GetParam:"dummy"  });
// }
// mySqlCalls.getDepartmentInfo(callback);
// res.render('super_admin/index', { title: 'Express', type:"index", authType:type, GetParam:"dummy"  });
	res.sendFile('index.html',{
		root: path.join(__dirname,'../../views/super_admin')
	})
});

// router.get('/login', function(req, res, next) {
//   res.render('super_admin/login', { title: 'Express', type:"login", GetParam:"dummy" });
// });

module.exports = app;
