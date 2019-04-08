var express = require('express');
var router = express.Router();
// var mySqlCalls = require('../apis/mySqlCalls');
var utility = require('../utilities');

router.get('/', function(req, res, next) {
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
function callback(err,results){
  var type = req.session.type;
  res.render('super_admin/index', { title: 'Express', type:"index", data:results, authType:type, departmentId:req.session.departmentId, GetParam:"dummy"  });
}
// mySqlCalls.getDepartmentInfo(callback);
console.log(res)
// res.render('super_admin/index', { title: 'Express', type:"index", authType:type, GetParam:"dummy"  });
});

router.get('/login', function(req, res, next) {
  res.render('super_admin/login', { title: 'Express', type:"login", GetParam:"dummy" });
});

module.exports = router;
