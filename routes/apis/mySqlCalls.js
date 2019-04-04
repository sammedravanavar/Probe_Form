var mysql = require('mysql');
var sqlObject = function(){
    this.connection = require('../../dbConnect').connectDB();

}

sqlObject.prototype.login = function(email, pass, callback){
	var connection = this.connection;
	var sql= "select * \
			from employee \
			where email=? and password=?";
	this.connection.query(sql, [email, pass], function(err, result){
        console.log(result)
        if(result == undefined || result.length == 0){
			// var sql = "select * \
			// 	from administrator_login \
			// 	where emailId=? and password=?";
				console.log("check for candidate login");
		//    connection.query(sql, [email, pass], function(err,result){
		// 	if(err){
		// 		callback(err,undefined);
		// 		return;
		// 	}
		// 	// console.log("hll");
		// 	callback(err,result);
		// })
		} else{
			callback(err, result);
		}
	})
}

sqlObject.prototype.getEmployeeDetails = function(sapientId, callback){
	var connection = this.connection;
	var sql= "select name, email, type, designation \
			from employee \
			where sapientId=?";
	this.connection.query(sql, [sapientId], function(err, result){
		callback(err,result);
	})
}

var object = new sqlObject();

module.exports = object;