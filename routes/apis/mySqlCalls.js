var mysql = require('mysql');
var sqlObject = function(){
    this.connection = require('../../dbConnect').connectDB();

}

sqlObject.prototype.editProfile = function(sapientId, name, email, type, designation){
	var connection = this.connection;
	var sql = `UPDATE employee SET employee.name = ?, employee.email =?, employee.type=?, employee.designation=? WHERE sapientId=?`;
	connection.query(sql,[name,email,type,designation,sapientId],function(err,result){
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
	var con = this.connection;
	var sql= "select name, email, type, designation \
			from employee \
			where sapientId=?";
	con.query(sql, [sapientId], function(err, result){
		callback(err,result);
	});
}

sqlObject.prototype.reviewQuestion = function(callback){
	var con = this.connection;
	var sql= `SELECT * FROM question_bank where status="pending" OR status="approved";`
	con.query(sql, function(err, result){
		callback(err,result);
	});
}

sqlObject.prototype.changeQuestionStatus = function(questionObjArr,callback){
	var con = this.connection;
	for(let i=0;i<questionObjArr.length;i++){
		var sql= `UPDATE question_bank SET question_bank.status=? WHERE question_bank.qId=?;`
		con.query(sql, [questionObjArr[i].status,questionObjArr[i].id],function(err, result){
			callback(err,result);
		});
	}
}

sqlObject.prototype.editPassword = function(password,sapientId,callback){
	var con = this.connection;
	var sql= `UPDATE employee SET employee.password = ? WHERE sapientId=?;`
	con.query(sql, [password,sapientId],function(err, result){
		callback(err,result);
	});
}

sqlObject.prototype.addQuestion = function(questionObj,callback){
	var con = this.connection;
	var sql= `INSERT INTO question_bank (text,op1,op2,op3,op4,op5,answer,careerStage,difficulty,technology,"approved") values(?,?,?,?,?,?,?,?,?,?);`
	con.query(sql, [questionObj.text,questionObj.op1,questionObj.op2,questionObj.op3,questionObj.op4,questionObj.op5,questionObj.answer,questionObj.careerStage,questionObj.difficulty,questionObj.technology],function(err, result){
		callback(err,result);
	});
}

sqlObject.prototype.addUser = function(employeeObj,callback){
	var con = this.connection;
	var sql= `INSERT INTO employee (sapientId,name,email,password,type,designation,"approved") values (?,?,?,?,?,?);`
	con.query(sql, [employeeObj.sapientId,employeeObj.name,employeeObj.email,employeeObj.password,employeeObj.type,employeeObj.designation],function(err, result){
		callback(err,result);
	});
}

sqlObject.prototype.reviewUser= function(callback){
	var con = this.connection;
	var sql= `SELECT * FROM employee where status="pending" OR status="approved";`
	con.query(sql, function(err, result){
		callback(err,result);
	});
}

sqlObject.prototype.createRole = function(permissionArr,callback){
	var con = this.connection;
	// for(let i=0;i<permissionArr.length;i++){
		var sql= `INSERT INTO role (type,permission) values ?;`
		con.query(sql, [permissionArr],function(err, result){
			callback(err,result);
		});
	// }
}

var object = new sqlObject();

module.exports = object;