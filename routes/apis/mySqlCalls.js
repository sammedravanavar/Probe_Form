var mysql = require('mysql');
var sqlObject = function(){
    this.connection = require('../../dbConnect').connectDB();

}

sqlObject.prototype.editProfile = function(sapientId, name, email, password, type, designation){
	var connection = this.connection;
	var sql = `UPDATE employee SET employee.name = ?, employee.email =?, employee.password=?, employee.type=?, employee.designation=? WHERE sapientId=?`;
	connection.query(sql,[name,email,password,type,designation,sapientId],function(err,result){
		//callback(err,result);
		if(err){
			console.log(err);
		}
		else{
			console.log(result);
		}
	});
}
sqlObject.prototype.login = function(email, pass, callback){
	// editProfile("145001","sammed","samravan@publicissapient.com","123456","super_admin","SAL1");
	var connection = this.connection;
	var sql= "select * \
			from employee \
			where email=? and password=?";
	connection.query(sql, [email, pass], function(err, result){
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